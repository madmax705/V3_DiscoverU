import { useNavigate } from "react-router-dom";
import { Bookmark, Trophy, Palette, Book, Heart } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";
import { Club } from "../lib/supabase-client";

interface FeaturedClubCardProps {
  club: Club;
  onClick?: (club: Club) => void;
}

const FeaturedClubCard: React.FC<FeaturedClubCardProps> = ({ club, onClick }) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(club.id.toString());

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleBookmark(club.id.toString());
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(club);
    } else {
      navigate(`/club/${club.slug}`);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sports":
        return <Trophy className="w-5 h-5 text-blue-600" />;
      case "Arts & Culture":
      case "Creativity":
        return <Palette className="w-5 h-5 text-green-600" />;
      case "Academic":
      case "Academics":
        return <Book className="w-5 h-5 text-amber-500" />;
      case "Service":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "Games & Recreation":
        return <Trophy className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative col-span-1 w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
      onClick={handleCardClick}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <button
          onClick={handleBookmarkClick}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-gray-700 backdrop-blur-sm transition-colors hover:bg-white"
        >
          <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-current text-blue-600" : ""}`} />
        </button>
        <img
          src={club.image_url || "/placeholder-banner.jpg"}
          alt={club.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4 pl-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
          {getCategoryIcon(club.category)}
          <span>{club.category}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{club.name}</h3>
      </div>
    </div>
  );
};

export default FeaturedClubCard;
