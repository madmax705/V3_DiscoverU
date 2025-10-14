import React from "react";
import { ExternalLink } from "lucide-react";

interface SimilarClub {
    id: number;
    name: string;
    rating: number;
    category: string;
    memberCount: number;
    slug: string;
}

interface SimilarClubsProps {
    similarClubs: SimilarClub[];
    currentClubCategory: string;
}

const SimilarClubs: React.FC<SimilarClubsProps> = ({
    similarClubs,
    currentClubCategory
}) => {
    const handleClubClick = (slug: string) => {
        window.location.href = `/club/${slug}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Similar Clubs
            </h3>
            <div className="space-y-3">
                {similarClubs.map((club) => (
                    <div
                        key={club.id}
                        onClick={() => handleClubClick(club.slug)}
                        className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-xl font-bold text-blue-600">
                                {club.rating.toFixed(2)}
                            </div>
                            <div>
                                <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                    {club.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {club.memberCount} members
                                </div>
                            </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    </div>
                ))}
            </div>
            {similarClubs.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                    <p>No similar clubs found</p>
                </div>
            )}
        </div>
    );
};

export default SimilarClubs;

