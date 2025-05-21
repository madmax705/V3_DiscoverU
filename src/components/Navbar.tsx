import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Bookmark } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBookmarks } from "../hooks/useBookmarks";

interface NavbarProps {
  onSearch?: (searchTerm: string) => void;
}

const Navbar = ({ onSearch = () => {} }: NavbarProps) => {
  const location = useLocation();
  const isClubsPage = location.pathname === "/clubs";
  const [isScrolled, setIsScrolled] = useState(false);
  const { bookmarkedClubs } = useBookmarks();
  const bookmarkCount = Object.keys(bookmarkedClubs).length;

  useEffect(() => {
    const handleScroll = () => {
      // Get the position of the hero section title
      const heroTitle = document.querySelector(".text-4xl.md\\:text-7xl");
      if (heroTitle) {
        const titleRect = heroTitle.getBoundingClientRect();
        // Trigger the transition earlier by checking if the title is 100px above the viewport bottom
        setIsScrolled(titleRect.bottom <= 100);
      }
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full ${isClubsPage || isScrolled ? "bg-white" : "bg-transparent"} transition-colors duration-300 border-b border-gray-200 py-3 px-6 sticky top-0 z-50`}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
        {isClubsPage ? (
          <>
            <div className="hidden md:flex items-center gap-6 flex-1">
              <a
                href="/"
                className="text-black hover:text-blue-600 font-bold text-[15px]"
              >
                Home
              </a>
              <a
                href="/clubs"
                className="text-black hover:text-blue-600 font-bold text-[15px]"
              >
                All Clubs
              </a>
              <a
                href="/about"
                className="text-black hover:text-blue-600 font-bold text-[15px]"
              >
                About
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-6 flex-1">
              <a
                href="/"
                className="text-black hover:text-blue-600 font-bold text-[15px]"
              >
                Home
              </a>
              <a
                href="/clubs"
                className="text-black hover:text-blue-600 font-bold text-[15px]"
              >
                All Clubs
              </a>
              <a
                href="/about"
                className="text-black hover:text-blue-600 font-bold text-[15px]"
              >
                About
              </a>
            </div>

            <a
              href="/"
              className="flex-1 flex justify-center items-center overflow-hidden"
            >
              <img
                src="/discoveru-logo.svg"
                alt="DiscoverU Logo"
                className="h-16 w-auto transform scale-[2.5]"
              />
            </a>
          </>
        )}

        <div className="flex items-center gap-4 flex-1 justify-end">
          {isClubsPage && (
            <div className="relative mr-2 hidden md:block">
              <Input
                placeholder="Search clubs..."
                className="w-[200px] pl-8 pr-4 h-10 rounded-full border border-blue-200 bg-blue-50/80 focus-visible:ring-blue-400"
                onChange={(e) => onSearch(e.target.value)}
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}
          <a href="/bookmarks">
            <Button variant="outline" className="font-extrabold relative">
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks
              {bookmarkCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </Button>
          </a>
          <a href="/login">
            <Button variant="outline" className="font-extrabold">
              Login
            </Button>
          </a>
          <a href="/signup">
            <Button className="font-extrabold">Sign Up</Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
