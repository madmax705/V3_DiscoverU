// Utility function to map club names to banner photos
export const getClubBannerPhoto = (clubName: string, category?: string): string => {
    const name = clubName.toLowerCase();
    console.log(`🔍 Mapping club: "${clubName}" (category: ${category})`);

    // CORRECT MAPPING based on actual current clubs
    if (name.includes('theatre team') || name.includes('theater team')) {
        console.log(`✅ Matched "${clubName}" to TheatreTeam.jpg`);
        return '/ClubBannerPhoto/TheatreTeam.jpg';
    }
    if (name.includes('experiment') || name.includes('game theory')) {
        console.log(`✅ Matched "${clubName}" to ChessClub.jpg`);
        return '/ClubBannerPhoto/ChessClub.jpg';
    }
    if (name.includes('biotechnology') || name.includes('ethical debate')) {
        console.log(`✅ Matched "${clubName}" to Biotecnology.jpg`);
        return '/ClubBannerPhoto/Biotecnology.jpg';
    }
    if (name.includes('animation')) {
        console.log(`✅ Matched "${clubName}" to Animation.jpg`);
        return '/ClubBannerPhoto/Animation.jpg';
    }
    if (name.includes('national economics') || name.includes('economics competition')) {
        console.log(`✅ Matched "${clubName}" to EconomicSociety.jpg`);
        return '/ClubBannerPhoto/EconomicSociety.jpg';
    }
    if (name.includes('dynamic storyboard') || name.includes('storyboard')) {
        console.log(`✅ Matched "${clubName}" to DynamicStoryingboarding.jpg`);
        return '/ClubBannerPhoto/DynamicStoryingboarding.jpg';
    }
    if (name.includes('coding for beginners') || name.includes('coding beginners')) {
        console.log(`✅ Matched "${clubName}" to Coding.jpg`);
        return '/ClubBannerPhoto/Coding.jpg';
    }
    if (name.includes('creative art club')) {
        console.log(`✅ Matched "${clubName}" to ArtTeam.jpg`);
        return '/ClubBannerPhoto/ArtTeam.jpg';
    }
    if (name.includes('bright night book club') || name.includes('book club discovery')) {
        console.log(`✅ Matched "${clubName}" to EnglishClinic.jpg`);
        return '/ClubBannerPhoto/EnglishClinic.jpg';
    }
    if (name.includes('math competition club') || name.includes('math competition')) {
        console.log(`✅ Matched "${clubName}" to MathClinic.jpg`);
        return '/ClubBannerPhoto/MathClinic.jpg';
    }
    if (name.includes('media team')) {
        console.log(`✅ Matched "${clubName}" to MediaTeam.jpg`);
        return '/ClubBannerPhoto/MediaTeam.jpg';
    }
    if (name.includes('marine conservation') || name.includes('marine') || name.includes('aquarist')) {
        console.log(`✅ Matched "${clubName}" to TheAquarist.jpg`);
        return '/ClubBannerPhoto/TheAquarist.jpg';
    }
    if (name.includes('first aid')) {
        console.log(`✅ Matched "${clubName}" to FirstAid.jpg`);
        return '/ClubBannerPhoto/FirstAid.jpg';
    }

    // Category-based fallbacks
    if (category && category.toLowerCase().includes('creativity')) {
        console.log(`✅ Matched "${clubName}" by category to ArtTeam.jpg`);
        return '/ClubBannerPhoto/ArtTeam.jpg';
    }
    if (category && category.toLowerCase().includes('academics')) {
        console.log(`✅ Matched "${clubName}" by category to MathClinic.jpg`);
        return '/ClubBannerPhoto/MathClinic.jpg';
    }
    if (category && category.toLowerCase().includes('service')) {
        console.log(`✅ Matched "${clubName}" by category to MediaTeam.jpg`);
        return '/ClubBannerPhoto/MediaTeam.jpg';
    }
    if (category && category.toLowerCase().includes('sports')) {
        console.log(`✅ Matched "${clubName}" by category to BasketballTeam.jpg`);
        return '/ClubBannerPhoto/BasketballTeam.jpg';
    }

    // Default fallback
    console.log(`⚠️ No match found for "${clubName}", using default ArtTeam.jpg`);
    return '/ClubBannerPhoto/ArtTeam.jpg';
};
