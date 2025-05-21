import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Users, User } from "lucide-react";

interface ClubCardProps {
  id?: string;
  name?: string;
  category?: string;
  description?: string;
  meetingTimes?: string;
  advisor?: string;
  memberCount?: number;
  logoUrl?: string;
  onLearnMore?: () => void;
  onNameClick?: () => void;
  onImageClick?: () => void;
}

const ClubCard = ({
  id = "chess-club",
  name = "Chess Club",
  category = "Games & Recreation",
  description = "A place for chess enthusiasts to gather, learn, and compete in a friendly environment.",
  meetingTimes = "Mondays & Wednesdays, 3:30 PM",
  advisor = "Dr. Smith",
  memberCount = 24,
  logoUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=chess",
  onLearnMore,
  onNameClick,
  onImageClick,
}: ClubCardProps) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/club/${id}`);
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

  return (
    <Card className="w-[350px] h-[400px] backdrop-blur-sm bg-white/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-2xl overflow-hidden border-2">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar
            className="w-16 h-16 cursor-pointer"
            onClick={handleImageClick}
          >
            <AvatarImage src={logoUrl} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle
              className="text-xl text-black cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleNameClick}
            >
              {name}
            </CardTitle>
            <Badge variant="secondary" className="mt-1 text-white">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm line-clamp-3 mb-4 text-black">
          {description}
        </CardDescription>

        <Button
          className="w-full py-6 text-lg font-medium mt-4 bg-blue-600 hover:bg-blue-700 transition-colors"
          onClick={handleExplore}
        >
          Explore
        </Button>

        <div className="flex justify-between items-center mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{advisor}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Club Advisor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{memberCount} members</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Member Count</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center text-xs text-gray-500">
          <span>See full details</span>
          <span>{category}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClubCard;
