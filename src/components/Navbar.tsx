import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Bookmark, LogOut, User, Bell, X } from "lucide-react";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBookmarks } from "../hooks/useBookmarks";
import { useAuth } from "../contexts/AuthContext";
import { useNotifications } from "../contexts/NotificationContext";
import NotificationPanel from "./NotificationPanel";
import { allClubsList } from "../data/clubsData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface NavbarProps {
  onSearch?: (searchTerm: string) => void;
}

// Helper to get initials, matching UserProfile
function getInitials(nameOrEmail: string | undefined) {
  if (!nameOrEmail) return "?";
  // If it's an email, use the part before the @
  const base = nameOrEmail.includes("@") ? nameOrEmail.split("@")[0] : nameOrEmail;
  return base
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();
}

const Navbar = ({ onSearch = () => { } }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isClubsPage = location.pathname === "/clubs";
  const isAboutPage = location.pathname === "/about";
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { bookmarkedClubs } = useBookmarks();
  const bookmarkCount = Object.keys(bookmarkedClubs).length;
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();

  const handleLogout = async () => {
    await signOut();
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setIsSearchOpen(value.length > 0);
    onSearch(value);
  };

  const handleClubSelect = (clubId: string, clubName: string) => {
    setSearchValue(clubName);
    setIsSearchOpen(false);
    onSearch(clubName);
    navigate(`/club/${clubId}`);
  };

  const filteredClubs = allClubsList
    .filter((club) =>
      club.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .slice(0, 8); // Limit to 8 suggestions

  return (
    <nav
      className="w-full bg-white border-b border-gray-200 py-3 px-6 sticky top-0 z-50"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
        {isClubsPage ? (
          <>
            <div className="hidden md:flex items-center gap-6 flex-1">
              <RouterLink
                to="/"
                className={`text-black hover:text-blue-600 font-bold text-[15px] ${location.pathname === '/' ? 'underline underline-offset-4 decoration-2 decoration-black' : ''}`}
              >
                Home
              </RouterLink>
              <RouterLink
                to="/about"
                className={`text-black hover:text-blue-600 font-bold text-[15px] ${location.pathname === '/about' ? 'underline underline-offset-4 decoration-2 decoration-black' : ''}`}
              >
                About
              </RouterLink>
              <RouterLink
                to="/clubs"
                className={`text-black hover:text-blue-600 font-bold text-[15px] ${location.pathname === '/clubs' ? 'underline underline-offset-4 decoration-2 decoration-black' : ''}`}
              >
                All Clubs
              </RouterLink>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-6 flex-1">
              <RouterLink
                to="/"
                className={`text-black hover:text-blue-600 font-bold text-[15px] ${location.pathname === '/' ? 'underline underline-offset-4 decoration-2 decoration-black' : ''}`}
              >
                Home
              </RouterLink>
              <RouterLink
                to="/about"
                className={`text-black hover:text-blue-600 font-bold text-[15px] ${location.pathname === '/about' ? 'underline underline-offset-4 decoration-2 decoration-black' : ''}`}
              >
                About
              </RouterLink>
              <RouterLink
                to="/clubs"
                className={`text-black hover:text-blue-600 font-bold text-[15px] ${location.pathname === '/clubs' ? 'underline underline-offset-4 decoration-2 decoration-black' : ''}`}
              >
                All Clubs
              </RouterLink>
            </div>

            <RouterLink
              to="/"
              className="flex-1 flex justify-center items-center overflow-hidden"
            >
              <img
                src="/discoveru-logo.svg"
                alt="DiscoverU Logo"
                className="h-16 w-auto transform scale-[2.5]"
              />
            </RouterLink>
          </>
        )}

        <div className="flex items-center gap-4 flex-1 justify-end">
          {isClubsPage && (
            <div className="relative mr-2 hidden md:block">
              <div className="relative">
                <Input
                  placeholder="Search clubs..."
                  className="w-[200px] pl-8 pr-4 h-10 rounded-full border border-blue-200 bg-blue-50/80 focus-visible:ring-blue-400"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setIsSearchOpen(searchValue.length > 0)}
                />
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                {searchValue && (
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                    onClick={() => handleSearchChange("")}
                  >
                    <X className="h-3 w-3 text-gray-400" />
                  </button>
                )}
              </div>
              {isSearchOpen && searchValue && (
                <div className="absolute top-full left-0 w-[200px] mt-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 animate-in fade-in-0 zoom-in-95 duration-200">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No clubs found.</CommandEmpty>
                      <CommandGroup>
                        {filteredClubs.map((club) => (
                          <CommandItem
                            key={club.id}
                            value={club.name}
                            onSelect={() => handleClubSelect(club.id, club.name)}
                            className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100 transition-colors text-black hover:text-black focus:text-black"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{club.name}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              )}
            </div>
          )}
          {user && (
            <Button
              variant="ghost"
              className="relative rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-200"
              aria-label="Notifications"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <Bell className="w-8 h-8" />
            </Button>
          )}

          <RouterLink to="/bookmarks">
            <Button variant="outline" className="font-extrabold relative rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-200" aria-label="Bookmarks">
              <Bookmark className="w-8 h-8" />
            </Button>
          </RouterLink>

          {user ? (
            <div className="flex items-center gap-2">
              <RouterLink to="/profile" className="flex items-center">
                <div className="relative flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center overflow-hidden shadow-md">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || user.email} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-blue-600">{getInitials(user.user_metadata?.full_name || user.email)}</span>
                  )}
                </div>
              </RouterLink>
            </div>
          ) : (
            <>
              <RouterLink to="/login">
                <Button variant="outline" className="font-extrabold">
                  Login
                </Button>
              </RouterLink>
              <RouterLink to="/signup">
                <Button className="font-extrabold">Sign Up</Button>
              </RouterLink>
            </>
          )}
        </div>
      </div>

      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </nav>
  );
};

export default Navbar;
