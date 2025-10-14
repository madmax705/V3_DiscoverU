import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Club } from "../lib/supabase-client";
import { useNavigate } from "react-router-dom";
import { getClubBannerPhoto } from "../utils/clubPhotoMapping";
import { User, X } from "lucide-react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { useClickOutside } from "../hooks/use-click-outside";

const TRANSITION = {
  type: 'spring',
  bounce: 0.05,
  duration: 0.3,
};

// Custom hook for outside click using the existing hook
function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useClickOutside(ref, callback);
}

interface ClubModalAnimatedProps {
  isOpen: boolean;
  onClose: () => void;
  club: Club;
  isLoading?: boolean;
}

const ClubModalAnimated = ({ isOpen, onClose, club, isLoading = false }: ClubModalAnimatedProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mapping current clubs to existing banner photos
  const getClubBannerPhoto = (clubName: string, category: string) => {
    const name = clubName.toLowerCase();

    // Direct name matches
    if (name.includes('media') || name.includes('media team')) return '/ClubBannerPhoto/MediaTeam.jpg';
    if (name.includes('math') || name.includes('competition')) return '/ClubBannerPhoto/MathClinic.jpg';
    if (name.includes('theatre') || name.includes('theater')) return '/ClubBannerPhoto/TheatreTeam.jpg';
    if (name.includes('art') || name.includes('creative')) return '/ClubBannerPhoto/ArtTeam.jpg';
    if (name.includes('animation')) return '/ClubBannerPhoto/ArtTeam.jpg';
    if (name.includes('storyboard')) return '/ClubBannerPhoto/ArtTeam.jpg';
    if (name.includes('book') || name.includes('literature')) return '/ClubBannerPhoto/EnglishClinic.jpg';
    if (name.includes('economics') || name.includes('economic')) return '/ClubBannerPhoto/EconomicSociety.jpg';
    if (name.includes('biotechnology') || name.includes('bio')) return '/ClubBannerPhoto/TechTeam.jpg';
    if (name.includes('coding') || name.includes('programming')) return '/ClubBannerPhoto/TechTeam.jpg';
    if (name.includes('experiment') || name.includes('game theory')) return '/ClubBannerPhoto/ChessClub.jpg';

    // Category-based fallbacks
    if (category.toLowerCase().includes('creativity')) return '/ClubBannerPhoto/ArtTeam.jpg';
    if (category.toLowerCase().includes('academics')) return '/ClubBannerPhoto/MathClinic.jpg';
    if (category.toLowerCase().includes('service')) return '/ClubBannerPhoto/MediaTeam.jpg';
    if (category.toLowerCase().includes('sports')) return '/ClubBannerPhoto/BasketballTeam.jpg';

    // Default fallback
    return '/ClubBannerPhoto/ArtTeam.jpg';
  };

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

  // Create dynamic gallery from existing ClubGalleryPhotos
  const getClubGalleryPhotos = (clubName: string) => {
    // Special handling for Creative Art Club
    if (clubName === "Creative Art Club") {
      const basePhotos = [
        {
          name: clubName,
          src: "/ClubGalleryPhotos/ArtTeam1.jpg", // Use ArtTeam1 as banner/cover
        }
      ];

      const artTeamPhotos = [];
      for (let i = 1; i <= 4; i++) {
        artTeamPhotos.push({
          name: `${clubName} Gallery ${i}`,
          src: `/ClubGalleryPhotos/ArtTeam${i}.jpg`,
        });
      }
      return [...basePhotos, ...artTeamPhotos];
    }

    // Default handling for other clubs
    const basePhotos = [
      {
        name: clubName,
        src: club.image_url || getClubBannerPhoto(club.name, club.category || ''),
      }
    ];

    // Try to get specific club gallery photos for other clubs
    const clubKey = clubName.replace(/\s+/g, ''); // Remove spaces
    const galleryPhotos = [];

    // Check if club gallery photos exist for this club
    for (let i = 1; i <= 4; i++) {
      galleryPhotos.push({
        name: `${clubName} Gallery ${i}`,
        src: `/ClubGalleryPhotos/${clubKey}${i}.jpg`,
      });
    }

    return [...basePhotos, ...galleryPhotos];
  };

  const clubMembers = getClubGalleryPhotos(club.name);

  const clubQuote = club.mission || club.description || "Experience our amazing community and activities!";
  const clubDesignation = club.category ? `${club.category} Club` : 'Discover amazing opportunities';

  return (
    <MotionConfig transition={TRANSITION}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-40"
            />
            {/* Modal */}
            <div className="fixed inset-0 grid place-items-center z-50 p-4">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl relative"
              >
                {/* Close button - positioned within card at top right */}
                <button
                  className="absolute top-4 right-4 z-50 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full h-10 w-10 shadow-lg transition-colors"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>

                {/* Animated Testimonials Content */}
                <div className="h-full overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-96">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <AnimatedTestimonials
                      members={clubMembers}
                      quote={clubQuote}
                      designation={clubDesignation}
                      clubName={club.name}
                      clubAdvisor={club.advisor}
                      clubCategory={club.category}
                      onExplore={() => {
                        navigate(`/club/${club.slug}`);
                        onClose();
                      }}
                      autoplay={true}
                      className="py-12"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};

export default ClubModalAnimated;