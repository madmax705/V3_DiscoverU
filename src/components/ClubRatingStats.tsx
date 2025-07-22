import React from 'react';
import { Star } from 'lucide-react';

interface ClubRatingStatsProps {
    averageRating: number;
    ratingCount: number;
    distribution: { [key: number]: number };
    userRating?: number | null;
}

const ClubRatingStats: React.FC<ClubRatingStatsProps> = ({
    averageRating,
    ratingCount,
    distribution,
    userRating
}) => {
    const maxCount = Math.max(...Object.values(distribution));

    return (
        <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h3 className="text-lg font-bold mb-4">Club Rating</h3>

            {/* Average Rating Display */}
            <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl font-bold text-gray-900">
                    {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`w-5 h-5 ${star <= Math.round(averageRating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>
                <div className="text-sm text-gray-600">
                    {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'}
                </div>
            </div>

            {/* Rating Distribution */}
            {ratingCount > 0 && (
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                            <div className="flex items-center gap-1 w-8">
                                <span className="text-sm font-medium">{rating}</span>
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${maxCount > 0 ? (distribution[rating] / maxCount) * 100 : 0}%`
                                    }}
                                />
                            </div>
                            <div className="text-sm text-gray-600 w-8 text-right">
                                {distribution[rating] || 0}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* User's Rating */}
            {userRating && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Your rating:</p>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-4 h-4 ${star <= userRating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                            />
                        ))}
                        <span className="ml-2 text-sm font-medium">{userRating}/5</span>
                    </div>
                </div>
            )}

            {ratingCount === 0 && (
                <p className="text-gray-500 text-sm">No ratings yet. Be the first to rate this club!</p>
            )}
        </div>
    );
};

export default ClubRatingStats; 