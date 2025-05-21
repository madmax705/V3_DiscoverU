import React from "react";
import ClubCard from "./ClubCard";

interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  meetingTimes: string;
  advisor: string;
  memberCount: number;
  logoUrl: string;
}

interface ClubGridProps {
  clubs?: Club[];
  onLearnMore?: (clubId: string) => void;
}

const defaultClubs: Club[] = [
  {
    id: "1",
    name: "Chess Club",
    category: "Games & Recreation",
    description:
      "A place for chess enthusiasts to gather, learn, and compete in a friendly environment.",
    meetingTimes: "Mondays & Wednesdays, 3:30 PM",
    advisor: "Dr. Smith",
    memberCount: 24,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=chess",
  },
  {
    id: "2",
    name: "Debate Team",
    category: "Academic",
    description:
      "Develop public speaking and argumentation skills through competitive debate.",
    meetingTimes: "Tuesdays & Thursdays, 4:00 PM",
    advisor: "Ms. Johnson",
    memberCount: 18,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=debate",
  },
  {
    id: "3",
    name: "Environmental Club",
    category: "Service",
    description:
      "Working together to make our school and community more environmentally sustainable.",
    meetingTimes: "Fridays, 3:00 PM",
    advisor: "Mr. Green",
    memberCount: 32,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=environment",
  },
  {
    id: "4",
    name: "Art Society",
    category: "Arts & Culture",
    description:
      "Express yourself through various art forms and showcase your creativity.",
    meetingTimes: "Wednesdays, 3:15 PM",
    advisor: "Ms. Rivera",
    memberCount: 28,
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=art",
  },
];

const ClubGrid = ({
  clubs = defaultClubs,
  onLearnMore = (clubId: string) =>
    console.log(`Learn more about club ${clubId}`),
  isLoading = false,
}: ClubGridProps) => {
  return (
    <div className="w-full min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {isLoading
          ? // Loading skeletons
            Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-[350px] h-[400px] rounded-2xl overflow-hidden border-2"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <div className="flex justify-between mt-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))
          : clubs.map((club) => (
              <ClubCard
                key={club.id}
                name={club.name}
                category={club.category}
                description={club.description}
                meetingTimes={club.meetingTimes}
                advisor={club.advisor}
                memberCount={club.memberCount}
                logoUrl={club.logoUrl}
                onLearnMore={() => onLearnMore(club.id)}
              />
            ))}
      </div>
    </div>
  );
};

export default ClubGrid;
