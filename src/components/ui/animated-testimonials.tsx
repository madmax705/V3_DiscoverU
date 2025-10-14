"use client";

import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// The data structure is now for a 'Member'
type Member = {
  name: string;
  src: string;
};

export const AnimatedTestimonials = ({
  members,
  quote,
  designation,
  clubName,
  clubAdvisor,
  clubCategory,
  onExplore,
  autoplay = false,
  className,
}: {
  members: Member[];
  quote: string; // A single quote for the whole component
  designation: string; // A single designation for the whole component
  clubName: string;
  clubAdvisor?: string | null;
  clubCategory?: string;
  onExplore?: () => void;
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + members.length) % members.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-6xl mx-auto px-8 md:px-16 lg:px-24 py-24", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {members.map((member, index) => (
                <motion.div
                  key={member.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : members.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={member.src}
                    alt={member.name}
                    width="500"
                    height="500"
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center group/button hover:bg-blue-600 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5 text-white group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center group/button hover:bg-blue-600 transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="h-5 w-5 text-white group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <div>
            {/* Static Club Name - does not change with images */}
            <h3 className="text-4xl font-extrabold text-foreground mb-2">
              {clubName}
            </h3>

            {/* Club Category and Advisor with consistent styling */}
            <div className="flex items-center gap-2 mb-4">
              {clubCategory && (
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {clubCategory}
                </span>
              )}
              {clubAdvisor && (
                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {clubAdvisor}
                </span>
              )}
            </div>

            {/* Mission statement with label */}
            <div className="mt-8">
              <p className="text-lg font-bold text-gray-600 mb-3">Mission:</p>
              <p className="text-lg text-gray-600 leading-relaxed font-normal mb-6">
                {quote}
              </p>

              {/* Explore button moved below mission statement */}
              <button
                onClick={onExplore}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl text-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-64"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};