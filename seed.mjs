import { createClient } from '@supabase/supabase-js';
import { allClubsList } from './src/data/clubsData.ts';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Ensure your environment variables are loaded
if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
    throw new Error("Supabase URL or Anon Key is not defined in .env.local");
}

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

async function seedDatabase() {
    console.log('Starting to seed the database...');

    // 1. Clear existing clubs to avoid duplicates
    const { error: deleteError } = await supabase.from('Club').delete().neq('id', -1);
    if (deleteError) {
        console.error('Error clearing Club table:', deleteError);
        return;
    }
    console.log('Cleared existing clubs.');

    // 2. Map old data to the new schema
    const clubsToInsert = allClubsList.map(club => ({
        name: club.name,
        description: club.description,
        category: club.category,
        advisor: club.advisor,
        meeting_times: club.meetingTimes,
        location: null, // Old data doesn't have a generic location field
        logo_url: club.logoUrl,
        image_url: club.imageUrl,
        member_count: club.memberCount,
        slug: club.id, // Use the old 'id' as the new 'slug'
        meets_wednesday: club.meetingTimes.toLowerCase().includes('wednesday'),
        meets_thursday: club.meetingTimes.toLowerCase().includes('thursday'),
    }));

    // 3. Insert the new data
    const { data, error } = await supabase.from('Club').insert(clubsToInsert).select();

    if (error) {
        console.error('Error seeding data:', error);
    } else {
        console.log(`Successfully seeded ${data.length} clubs.`);
    }
}

seedDatabase(); 