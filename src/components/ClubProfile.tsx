import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Clock, MapPin, Users, Target, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Leader {
  name: string;
  role: string;
  photoUrl: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface Achievement {
  title: string;
  date: string;
  description: string;
}

interface ClubProfileProps {
  id?: string;
  name?: string;
  category?: string;
  bannerUrl?: string;
  logoUrl?: string;
  mission?: string;
  meetingTimes?: string;
  location?: string;
  leaders?: Leader[];
  socialLinks?: SocialLink[];
  achievements?: Achievement[];
  galleryImages?: string[];
}

const ClubProfile = ({
  id = "chess-club",
  name = "Chess Club",
  category = "Games & Recreation",
  bannerUrl = "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&q=85&w=1200",
  logoUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=chess",
  mission = "Our mission is to foster strategic thinking and competitive spirit through the game of chess, while building a community of passionate players.",
  meetingTimes = "Mondays & Wednesdays, 3:30 PM - 5:00 PM",
  location = "Room 204, Student Center",
  leaders = [
    {
      name: "Sarah Chen",
      role: "Student Leader",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
  ],
  socialLinks = [
    { platform: "Instagram", url: "#" },
    { platform: "Discord", url: "#" },
  ],
  achievements = [
    {
      title: "State Championship",
      date: "December 2023",
      description: "First place in the state collegiate chess championship",
    },
  ],
  galleryImages = [
    "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&q=85&w=400",
    "https://images.unsplash.com/photo-1580541631971-a0e1263c5b34?ixlib=rb-4.0.3&q=85&w=400",
    "https://images.unsplash.com/photo-1638167821652-ad45431d6f21?ixlib=rb-4.0.3&q=85&w=400",
  ],
  onClose,
}: ClubProfileProps) => {
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    if (onClose) {
      onClose();
    }
    navigate(`/club/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Banner */}
      <div className="relative h-[250px] bg-gray-200 overflow-hidden">
        <img
          src={bannerUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-20"></div>
      </div>

      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <span className="font-bold text-black">{name}</span>
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="secondary"
                  className="text-sm font-medium text-white px-3 py-1"
                >
                  {category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-sm font-medium text-white px-3 py-1 flex items-center gap-1"
                >
                  <Users className="w-3 h-3 text-white" />
                  <span>{leaders[0]?.name || "Student Leader"}</span>
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
            >
              Join Club
            </Button>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-6 bg-blue-50/70 p-4 rounded-md border border-blue-100/70">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-700">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Our Mission</span>
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed italic border-l-3 border-blue-200/70 pl-3">
            "{mission}"
          </p>
        </div>

        {/* Discover Button */}
        <div className="mb-6 flex justify-center mt-12 relative">
          <div className="discover-button-wrapper">
            <Button
              size="lg"
              className="discover-button bg-blue-500 text-white font-bold px-16 py-7 text-2xl flex items-center justify-center gap-2 rounded-full border-3 border-blue-500 relative overflow-hidden z-10"
              onClick={handleDiscoverClick}
            >
              <div className="flex items-center gap-2 justify-center w-full relative z-30">
                <span className="discover-text transition-all duration-500">
                  Discover
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
