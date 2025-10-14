import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Star, BookmarkIcon } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';
import ArtTeamPopup from './ArtTeamPopup';

interface ArtTeamCardProps {
    club: {
        name: string;
        description: string | null;
        category?: string;
        meeting_times?: string | null;
        location?: string | null;
        advisor?: string | null;
        member_count?: number;
        slug?: string;
        id?: number | string;
        image_url?: string | null;
    };
    averageRating?: number;
    ratingCount?: number;
}

const ArtTeamCard: React.FC<ArtTeamCardProps> = ({
    club,
    averageRating = 0,
    ratingCount = 0
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const bookmarked = isBookmarked(club.id?.toString() || club.slug || '');

    const handleCardClick = () => {
        setIsPopupOpen(true);
    };

    const handleBookmarkToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleBookmark(club.id?.toString() || club.slug || '');
    };

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCardClick}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
                {/* Club Banner Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={club.image_url || "/ClubBannerPhoto/ArtTeam.jpg"}
                        alt={`${club.name} banner`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Bookmark Button */}
                    <button
                        onClick={handleBookmarkToggle}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${bookmarked
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-blue-600'
                            }`}
                    >
                        <BookmarkIcon size={16} fill={bookmarked ? 'currentColor' : 'none'} />
                    </button>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                            <Palette size={14} />
                            {club.category || 'Creative'}
                        </span>
                    </div>

                    {/* Rating Badge */}
                    {averageRating > 0 && (
                        <div className="absolute bottom-3 left-3">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                                <Star size={14} className="text-yellow-500" fill="currentColor" />
                                {averageRating.toFixed(1)}
                                <span className="text-xs text-gray-600">({ratingCount})</span>
                            </span>
                        </div>
                    )}
                </div>

                {/* Club Info */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {club.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {club.description || 'Join our creative community and express your artistic vision.'}
                    </p>

                    {/* Quick Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        {club.member_count && (
                            <span>{club.member_count} members</span>
                        )}
                        <span className="text-blue-600 font-medium">View Gallery →</span>
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300" />
            </motion.div>

            {/* Popup Modal */}
            <ArtTeamPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                club={club}
                averageRating={averageRating}
                ratingCount={ratingCount}
            />
        </>
    );
};

export default ArtTeamCard;

