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