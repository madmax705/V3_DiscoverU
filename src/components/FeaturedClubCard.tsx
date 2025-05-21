import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  BookmarkCheck,
  Trophy,
  Palette,
  Book,
  Heart,
} from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";

interface FeaturedClubCardProps {
  id?: string;
  name: string;
  category: string;
  imageUrl: string;
  onNameClick?: () => void;
  onImageClick?: () => void;
  onExploreClick?: () => void;
}

const FeaturedClubCard = ({
  id = "chess-club",
  name = "Chess Club",
  category = "Games & Recreation",
  imageUrl = "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?ixlib=rb-4.0.3&q=85&w=800&h=600",
  onNameClick,
  onImageClick,
  onExploreClick,
}: FeaturedClubCardProps) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(id);
  };

  const handleNameClick = () => {
    if (onNameClick) {
      onNameClick();
    }
  };

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick();
    }
  };

  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      navigate(`/club/${id}`);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="relative w-full h-[300px] group overflow-hidden rounded-lg bg-white/50 backdrop-blur-sm">
        <button
          className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 rounded-full transition-colors z-10"
          onClick={handleBookmarkClick}
          aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          {bookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-blue-600" />
          ) : (
            <Bookmark className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          onClick={handleImageClick}
        />
        <div className="absolute bottom-4 left-4 p-2 bg-white hover:bg-gray-100 rounded-full transition-colors">
          {category === "Sports" && (
            <Trophy className="w-5 h-5 text-blue-600" />
          )}
          {category === "Arts & Culture" && (
            <Palette className="w-5 h-5 text-green-600" />
          )}
          {category === "Creativity" && (
            <Palette className="w-5 h-5 text-green-600" />
          )}
          {category === "Academics" && (
            <Book className="w-5 h-5 text-amber-500" />
          )}
          {category === "Academic" && (
            <Book className="w-5 h-5 text-amber-500" />
          )}
          {category === "Service" && <Heart className="w-5 h-5 text-red-500" />}
          {category === "Games & Recreation" && (
            <Trophy className="w-5 h-5 text-blue-600" />
          )}
        </div>
      </div>
      <h3
        className="text-xl font-bold text-black pl-3 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={handleNameClick}
      >
        {name}
      </h3>
    </div>
  );
};

export default FeaturedClubCard;
