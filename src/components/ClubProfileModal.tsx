import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Club } from "../lib/supabase-client";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import PulseLoader from "./PulseLoader";

// Custom hook for outside click
function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, callback]);
}

interface ClubProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  club: Club;
  isLoading?: boolean;
}

const ClubProfileModal = ({ isOpen, onClose, club, isLoading = false }: ClubProfileModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useOutsideClick(ref, () => {
    if (isOpen) onClose();
  });

  // Reset image loading state when club changes
  useEffect(() => {
    setImageLoading(true);
  }, [club.id]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 h-full w-full z-40"
          />
          {/* Modal Card (no blue border layer) */}
          <div className="fixed inset-0 grid place-items-center z-50">
            <motion.div
              ref={ref}
              layoutId={`club-modal-${club.id}-${id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-200 relative"
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full h-8 w-8 shadow"
                onClick={onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </button>

              {/* Banner with loading state */}
              <div className="w-full h-64 bg-gray-200 relative">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <PulseLoader size="medium" />
                  </div>
                )}
                <img
                  src={club.image_url || "/placeholder-banner.jpg"}
                  alt={club.name}
                  className={`w-full h-full object-cover object-top transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              </div>

              {/* Club info with loading state */}
              <div className="flex flex-col gap-2 p-6">
                {isLoading ? (
                  <>
                    <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 mx-auto w-3/4"></div>
                    <div className="flex justify-center items-center gap-3 mb-4">
                      <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                      <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24"></div>
                    </div>
                    <div className="space-y-2 mb-5">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse mt-2"></div>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">{club.name}</h2>
                    <div className="flex justify-center items-center gap-3 mb-4">
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1 rounded-full w-fit flex items-center">{club.category}</span>
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1 rounded-full w-fit flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {club.advisor ? club.advisor : "N/A"}
                      </span>
                    </div>
                    <div className="text-gray-700 text-base text-center mb-5">
                      <span className="font-semibold">Mission:</span> {club.mission || "No mission statement provided."}
                    </div>
                    <button
                      className="mt-2 w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg transition-all duration-200 shadow-md"
                      onClick={() => navigate(`/club/${club.slug}`)}
                    >
                      Discover
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Close icon as a component
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-black">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

export default ClubProfileModal;
