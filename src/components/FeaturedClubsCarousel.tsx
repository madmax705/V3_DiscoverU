import React, { useState } from "react";
import { Button } from "./ui/button";
import FeaturedClubCard from "./FeaturedClubCard";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface FeaturedClub {
  name: string;
  category: string;
  imageUrl: string;
}

interface FeaturedClubsCarouselProps {
  clubs?: FeaturedClub[];
  onClubSelect?: (clubId: string) => void;
  onExploreMore?: () => void;
}

const defaultClubs = [
  // Row 1
  {
    id: "aquarist-club",
    name: "The Aquarist",
    category: "Academic",
    imageUrl:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&q=85&w=800&h=600",
  },
  {
    name: "Theatre Team",
    category: "Arts & Culture",
    imageUrl:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?ixlib=rb-4.0.3&q=85&w=800&h=600",
  },
  {
    name: "Cancer Club",
    category: "Service",
    imageUrl:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&q=85&w=800&h=600",
  },
  // Row 2
  {
    name: "Football Team",
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&q=85&w=800&h=600",
  },
  {
    name: "Linguistics Club",
    category: "Academic",
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&q=85&w=800&h=600",
  },
  {
    name: "Art Team",
    category: "Arts & Culture",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&q=85&w=800&h=600",
  },
  // Row 3
  {
    name: "Tech Team",
    category: "Service",
    imageUrl:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&q=85&w=800&h=600",
  },
  {
    name: "Basketball Team",
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&q=85&w=800&h=600",
  },
  {
    name: "Grizzlies TV",
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&q=85&w=800&h=600",
  },
];

const FeaturedClubsCarousel = ({
  clubs = defaultClubs,
  onClubSelect = () => {},
  onExploreMore = () => {},
  isLoading = false,
}: FeaturedClubsCarouselProps) => {
  const [leadership, setLeadership] = useState("all");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full px-4 md:px-8 -mt-8 aspect-square">
      <div className="relative flex mb-6 items-center">
        <div className="flex-1 flex items-center">
          <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="border rounded-md px-4 py-2 flex items-center gap-2 w-auto justify-between outline-none focus:outline-none focus:ring-0 ring-0 bg-white hover:bg-white backdrop-blur-sm hover:shadow-md active:shadow-md transition-all duration-300 text-black hover:text-black active:bg-white"
              >
                {leadership === "all"
                  ? "All"
                  : leadership === "student"
                    ? "Student Lead"
                    : "Teacher Lead"}
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-200"
                  style={{ transform: `rotate(${open ? 180 : 0}deg)` }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="rounded-md w-[200px] p-2"
              align="start"
            >
              <DropdownMenuItem
                onClick={() => setLeadership("all")}
                className={`px-3 py-2 flex items-center justify-between ${leadership === "all" ? "bg-gray-100" : "hover:bg-gray-50/[0.01]"}`}
              >
                All
                {leadership === "all" && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLeadership("student")}
                className={`px-3 py-2 flex items-center justify-between ${leadership === "student" ? "bg-gray-100" : "hover:bg-gray-50/[0.01]"}`}
              >
                Student Lead
                {leadership === "student" && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLeadership("teacher")}
                className={`px-3 py-2 flex items-center justify-between ${leadership === "teacher" ? "bg-gray-100" : "hover:bg-gray-50/[0.01]"}`}
              >
                Teacher Lead
                {leadership === "teacher" && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Filter buttons removed */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 justify-items-center">
        {isLoading
          ? // Loading skeletons
            Array(12)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-full space-y-3">
                  <Skeleton className="w-full h-[300px] rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ))
          : location?.pathname === "/"
            ? // Animated rows on homepage
              Array.from({ length: Math.ceil(clubs.length / 3) }).map(
                (_, rowIndex) => {
                  const rowClubs = clubs.slice(
                    rowIndex * 3,
                    (rowIndex + 1) * 3,
                  );
                  return (
                    <AnimatedRow
                      key={rowIndex}
                      rowIndex={rowIndex}
                      clubs={rowClubs}
                      onClubSelect={onClubSelect}
                    />
                  );
                },
              )
            : // Regular rendering for non-homepage views
              clubs.map((club, index) => {
                const clubData = {
                  name: club.name,
                  category: club.category,
                  bannerUrl: club.imageUrl,
                  logoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${club.name.toLowerCase().replace(/\s/g, "")}`,
                  mission:
                    "Our mission is to foster a community of passionate individuals interested in this field.",
                  meetingTimes: "Mondays & Wednesdays, 3:30 PM - 5:00 PM",
                  location: "Room 204, Student Center",
                  leaders: [
                    {
                      name: "Student Leader",
                      role: "President",
                      photoUrl:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=leader1",
                    },
                    {
                      name: "Faculty Advisor",
                      role: "Faculty Advisor",
                      photoUrl:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=advisor1",
                    },
                  ],
                  socialLinks: [
                    { platform: "Instagram", url: "#" },
                    { platform: "Discord", url: "#" },
                  ],
                  achievements: [
                    {
                      title: "Recent Achievement",
                      date: "December 2023",
                      description: "A notable achievement by this club",
                    },
                  ],
                  galleryImages: [
                    club.imageUrl,
                    "https://images.unsplash.com/photo-1580541631971-a0e1263c5b34?ixlib=rb-4.0.3&q=85&w=400",
                    "https://images.unsplash.com/photo-1638167821652-ad45431d6f21?ixlib=rb-4.0.3&q=85&w=400",
                  ],
                };

                const clubId =
                  club.id || club.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <FeaturedClubCard
                    key={index}
                    id={clubId}
                    name={club.name}
                    category={club.category}
                    imageUrl={club.imageUrl}
                    onNameClick={() => onClubSelect(clubId)}
                    onImageClick={() => onClubSelect(clubId)}
                  />
                );
              })}
      </div>
    </div>
  );
};

// Animated row component for scroll reveal effect
interface AnimatedRowProps {
  rowIndex: number;
  clubs: any[];
  onClubSelect: (clubId: string) => void;
}

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

const AnimatedRow = ({ rowIndex, clubs, onClubSelect }: AnimatedRowProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // First row (first three clubs) doesn't need animation
  const isFirstRow = rowIndex === 0;

  useEffect(() => {
    // Skip observer setup for first row
    if (isFirstRow) {
      setIsVisible(true);
      return;
    }

    // Create an intersection observer with more generous settings
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Set visible when the element enters the viewport
          setIsVisible(true);
          // Once visible, no need to observe anymore
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        // Lower threshold to trigger earlier
        threshold: 0.05,
        // Negative bottom margin means it will trigger before fully in view
        rootMargin: "0px 0px -100px 0px",
      },
    );

    // Start observing when component mounts
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [isFirstRow]);

  // Animation variants for the row container
  const rowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Animation variants for each club card - increased y offset for more noticeable effect
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <React.Fragment>
      {clubs.map((club, index) => {
        const clubId = club.id || club.name.toLowerCase().replace(/\s+/g, "-");

        // For first row, render without animation effects
        if (isFirstRow) {
          return (
            <div key={index} className="w-full">
              <FeaturedClubCard
                id={clubId}
                name={club.name}
                category={club.category}
                imageUrl={club.imageUrl}
                onNameClick={() => onClubSelect(clubId)}
                onImageClick={() => onClubSelect(clubId)}
              />
            </div>
          );
        }

        // For other rows, keep the animation
        return (
          <motion.div
            key={index}
            ref={index === 0 ? ref : null} // Only attach ref to first item in row
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={cardVariants}
            className="w-full"
            // Add a small delay based on index for staggered effect
            custom={index}
            transition={{
              delay: index * 0.1,
            }}
          >
            <FeaturedClubCard
              id={clubId}
              name={club.name}
              category={club.category}
              imageUrl={club.imageUrl}
              onNameClick={() => onClubSelect(clubId)}
              onImageClick={() => onClubSelect(clubId)}
            />
          </motion.div>
        );
      })}
    </React.Fragment>
  );
};

export default FeaturedClubsCarousel;
