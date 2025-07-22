import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import FeaturedClubCard from "./FeaturedClubCard";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";
import { Club } from "../lib/supabase-client";

interface FeaturedClubsCarouselProps {
  clubs?: Club[];
  onClubSelect?: (clubId: string) => void;
  onExploreMore?: () => void;
  isLoading?: boolean;
  leadership?: string;
  onLeadershipChange?: (leadership: string) => void;
}

const LazyClubCard = ({ club, onClubSelect, index }: {
  club: Club;
  onClubSelect: (clubId: string) => void;
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (cardRef.current) observer.unobserve(cardRef.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div ref={cardRef} className="w-full">
      {!isVisible ? (
        <div className="space-y-3">
          <Skeleton className="w-full h-[300px] rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <FeaturedClubCard club={club} onClick={() => onClubSelect(club.id)} />
        </motion.div>
      )}
    </div>
  );
};

const FeaturedClubsCarousel = ({
  clubs,
  onClubSelect = () => { },
  onExploreMore = () => { },
  isLoading = false,
  leadership: leadershipProp = "",
  onLeadershipChange = () => { },
}: FeaturedClubsCarouselProps) => {
  const [leadership, setLeadership] = useState("all");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading || !clubs) {
    return (
      <div className="w-full px-4 md:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="w-full h-[300px] rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const teacherLedSlugs = [
    "flute-club", "linguistics-club", "football-team", "basketball-team",
    "volleyball-team", "bpc-club", "math-clinic", "english-clinic",
    "eco-club", "chess-club"
  ];

  const filteredClubs = clubs.filter((club) => {
    if (leadership === "all") return true;
    if (leadership === "teacher") return teacherLedSlugs.includes(club.slug);
    if (leadership === "student") return !teacherLedSlugs.includes(club.slug);
    return true;
  });

  return (
    <div className="w-full px-4 md:px-8 -mt-8">
      <div className="relative flex mb-6 items-center">
        <div className="flex-1 flex items-center">
          <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="border rounded-md px-4 py-2 flex items-center gap-2 w-auto justify-between outline-none focus:outline-none focus:ring-0 ring-0 bg-white hover:bg-white backdrop-blur-sm hover:shadow-md active:shadow-md transition-all duration-300 text-black hover:text-black active:bg-white"
              >
                {leadership === "all" ? "All Clubs" : leadership === "student" ? "Student Lead" : "Teacher Lead"}
                <ChevronDown className="h-4 w-4 transition-transform duration-200" style={{ transform: `rotate(${open ? 180 : 0}deg)` }} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-md w-[200px] p-2" align="start">
              <DropdownMenuItem onClick={() => { setLeadership("all"); onLeadershipChange("all"); }} className={`px-3 py-2 flex items-center justify-between ${leadership === "all" ? "bg-gray-100" : "hover:bg-gray-50/[0.01]"}`}>
                All
                {leadership === "all" && <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setLeadership("student"); onLeadershipChange("student"); }} className={`px-3 py-2 flex items-center justify-between ${leadership === "student" ? "bg-gray-100" : "hover:bg-gray-50/[0.01]"}`}>
                Student Lead
                {leadership === "student" && <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setLeadership("teacher"); onLeadershipChange("teacher"); }} className={`px-3 py-2 flex items-center justify-between ${leadership === "teacher" ? "bg-gray-100" : "hover:bg-gray-50/[0.01]"}`}>
                Teacher Lead
                {leadership === "teacher" && <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {filteredClubs.map((club, index) => (
          <LazyClubCard
            key={club.id || index}
            club={club}
            onClubSelect={onClubSelect}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedClubsCarousel;
