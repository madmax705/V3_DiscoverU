import React from "react";
import { Bookmark, Star } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";
import { Badge } from "./ui/badge";
import { Club } from '../lib/supabase-client';
import { useNavigate } from "react-router-dom";

interface ClubCardProps {
  club: Club;
  onExplore: (clubId: string) => void;
  isJoined?: boolean;
  averageRating?: number;
  ratingCount?: number;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onExplore, isJoined, averageRating = 0, ratingCount = 0 }) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarked = isBookmarked(club.id.toString());

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(club.id.toString());
  };

  const handleExploreClick = () => {
    navigate(`/club/${club.slug}`);
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={handleExploreClick}
    >
      {isJoined && (
        <span className="absolute left-3 top-3 z-20 text-green-500 bg-white rounded-full p-1 shadow" title="You have joined this club">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
      <div className="relative h-48 w-full">
        <img
          src={club.image_url || '/placeholder.jpg'}
          alt={club.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ willChange: "transform" }}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <button
        onClick={handleBookmarkClick}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-gray-700 backdrop-blur-sm transition-colors hover:bg-white"
        aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        <Bookmark
          className={`h-5 w-5 ${bookmarked ? "fill-current text-blue-600" : ""
            }`}
        />
      </button>
      <div className="p-4">
        <h3 className="truncate text-lg font-bold text-gray-900">{club.name}</h3>
        <Badge variant="secondary" className="mt-1">
          {club.category}
        </Badge>

        {/* Rating Display */}
        {ratingCount > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">
              {averageRating.toFixed(1)} ({ratingCount})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubCard;
