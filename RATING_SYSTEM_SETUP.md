# Club Rating System Setup Guide

## Overview

The club rating system allows users to rate clubs on a 1-5 star scale and view average ratings and statistics. The system includes:

- Interactive star rating UI
- User-specific ratings (one rating per user per club)
- Average rating display with count
- Rating distribution visualization
- Real-time rating updates
- Rating display on club cards and profiles

## Database Setup

### 1. Create the ClubRating Table

Run the following SQL in your Supabase SQL editor:

```sql
-- Create ClubRating table
CREATE TABLE IF NOT EXISTS "ClubRating" (
    "id" SERIAL PRIMARY KEY,
    "user_id" UUID NOT NULL,
    "club_id" INTEGER NOT NULL REFERENCES "Club"("id") ON DELETE CASCADE,
    "rating" INTEGER NOT NULL CHECK ("rating" >= 1 AND "rating" <= 5),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE("user_id", "club_id")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "ClubRating_club_id_idx" ON "ClubRating"("club_id");
CREATE INDEX IF NOT EXISTS "ClubRating_user_id_idx" ON "ClubRating"("user_id");
CREATE INDEX IF NOT EXISTS "ClubRating_rating_idx" ON "ClubRating"("rating");

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_club_rating_updated_at 
    BEFORE UPDATE ON "ClubRating" 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE "ClubRating" ENABLE ROW LEVEL SECURITY;

-- Create policies for ClubRating table
-- Users can only see ratings for clubs
CREATE POLICY "Users can view all club ratings" ON "ClubRating"
    FOR SELECT USING (true);

-- Users can only insert/update their own ratings
CREATE POLICY "Users can insert their own ratings" ON "ClubRating"
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" ON "ClubRating"
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own ratings
CREATE POLICY "Users can delete their own ratings" ON "ClubRating"
    FOR DELETE USING (auth.uid() = user_id);
```

### 2. Update Database Types

The database types have been updated in `src/types/database.ts` to include the ClubRating table.

## Features

### 1. Interactive Rating UI

- **Location**: Club profile page header
- **Functionality**: 
  - Hover to preview rating
  - Click to submit rating
  - Shows loading state while saving
  - Displays average rating and count

### 2. Rating Statistics Component

- **Location**: Fixed position bottom-right on club profile page
- **Features**:
  - Average rating display
  - Total rating count
  - Rating distribution chart
  - User's personal rating (if logged in)

### 3. Club Card Ratings

- **Location**: Club grid cards
- **Features**:
  - Shows average rating with stars
  - Displays rating count
  - Only shows if ratings exist

## API Functions

### Core Rating Functions

```typescript
// Get user's rating for a specific club
getUserRating(userId: string, clubId: number): Promise<number | null>

// Set or update a user's rating for a club
setClubRating(userId: string, clubId: number, rating: number): Promise<{ success: boolean; error?: any; data?: any }>

// Get average rating and count for a club
getClubAverageRating(clubId: number): Promise<{ average: number; count: number }>

// Get detailed rating statistics including distribution
getClubRatingStats(clubId: number): Promise<{ average: number; count: number; distribution: { [key: number]: number } }>
```

## Usage Examples

### Basic Rating Implementation

```typescript
import { setClubRating, getClubAverageRating } from '../lib/supabase-client';

// Rate a club
const handleRating = async (clubId: number, rating: number) => {
  if (!user) {
    navigate('/login');
    return;
  }
  
  const result = await setClubRating(user.id, clubId, rating);
  if (result.success) {
    // Refresh average rating
    const avgData = await getClubAverageRating(clubId);
    setAverageRating(avgData.average);
    setRatingCount(avgData.count);
  }
};
```

### Display Rating Statistics

```typescript
import ClubRatingStats from '../components/ClubRatingStats';

<ClubRatingStats
  averageRating={4.2}
  ratingCount={15}
  distribution={{ 1: 0, 2: 1, 3: 2, 4: 5, 5: 7 }}
  userRating={5}
/>
```

## Security Features

- **Row Level Security (RLS)**: Users can only modify their own ratings
- **Input Validation**: Ratings must be between 1-5
- **Unique Constraints**: One rating per user per club
- **Cascade Deletion**: Ratings are deleted when clubs are deleted

## Performance Considerations

- **Indexes**: Created on club_id, user_id, and rating for fast queries
- **Caching**: Consider implementing client-side caching for frequently accessed ratings
- **Batch Loading**: Club grid loads all ratings in a single batch

## Troubleshooting

### Common Issues

1. **"Permission denied" errors**: Ensure RLS policies are correctly set up
2. **Rating not saving**: Check that user is authenticated and club_id is valid
3. **Type errors**: Ensure database types are up to date

### Debug Queries

```sql
-- Check if ratings exist for a club
SELECT * FROM "ClubRating" WHERE club_id = 1;

-- Get average rating for all clubs
SELECT 
  club_id,
  AVG(rating) as average_rating,
  COUNT(*) as rating_count
FROM "ClubRating" 
GROUP BY club_id;

-- Check user's ratings
SELECT * FROM "ClubRating" WHERE user_id = 'your-user-id';
```

## Future Enhancements

- Rating comments/reviews
- Rating moderation system
- Rating analytics dashboard
- Email notifications for new ratings
- Rating trends over time
- Club rating leaderboards 