'use client';
import { useClickOutside } from '@/hooks/use-click-outside';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowLeftIcon, MapPin, Users, Clock, User, Star, BookmarkIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';

const TRANSITION = {
  type: 'spring',
  bounce: 0.05,
  duration: 0.3,
};

interface ClubPopoverProps {
  club: {
    name: string;
    description: string | null;
    category?: string;
    meeting_times?: string | null;
    location?: string | null;
    advisor?: string | null;
    member_count?: number;
    slug?: string;
    id?: number | string;
    image_url?: string | null;
    galleryImages?: Array<{ url: string; caption: string }>;
  };
  averageRating?: number;
  ratingCount?: number;
}

function ClubPopover({ club, averageRating = 0, ratingCount = 0 }: ClubPopoverProps) {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarked = isBookmarked(club.id?.toString() || club.slug || '');

  // Use galleryImages from club data if available, otherwise use empty array
  const galleryImages = (club as any).galleryImages || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleViewMore = () => {
    const clubSlug = club.slug || club.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/club/${clubSlug}`);
    closeMenu();
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(club.id?.toString() || club.slug || '');
  };

  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className='relative flex items-center justify-center'>
        <motion.button
          key='button'
          layoutId={`popover-${uniqueId}`}
          className='flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 hover:bg-gray-50 transition-colors dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600'
          style={{
            borderRadius: 8,
          }}
          onClick={openMenu}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className='text-sm font-medium'
          >
            {club.name}
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className='absolute h-[320px] w-[380px] overflow-hidden border border-zinc-950/10 bg-white outline-none shadow-xl dark:bg-zinc-800 dark:border-zinc-700 z-50'
              style={{
                borderRadius: 12,
                top: '100%',
                marginTop: 8,
              }}
            >
              <div className='flex h-full flex-col'>
                {/* Header */}
                <div className='p-4 border-b border-gray-100 dark:border-zinc-700'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 min-w-0'>
                      <motion.h3
                        layoutId={`popover-label-${uniqueId}`}
                        className='text-lg font-semibold text-zinc-900 dark:text-zinc-50 truncate'
                      >
                        {club.name}
                      </motion.h3>
                      {club.category && (
                        <span className='inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200'>
                          {club.category}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleBookmarkToggle}
                      className={`ml-2 p-1.5 rounded-lg transition-colors ${bookmarked
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600'
                        }`}
                    >
                      <BookmarkIcon size={14} fill={bookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className='flex-1 p-4 overflow-y-auto'>
                  {/* Gallery Section for Art Team */}
                  {galleryImages.length > 0 && (
                    <div className='mb-6'>
                      <h3 className='text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3'>
                        Gallery
                      </h3>
                      <div className='relative'>
                        <img
                          src={galleryImages[currentImageIndex].url}
                          alt={galleryImages[currentImageIndex].caption}
                          className='w-full h-32 object-cover rounded-lg'
                        />
                        {galleryImages.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors'
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={nextImage}
                              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors'
                            >
                              <ChevronRight size={16} />
                            </button>
                          </>
                        )}
                      </div>
                      <p className='text-xs text-zinc-500 dark:text-zinc-400 mt-2 text-center'>
                        {galleryImages[currentImageIndex].caption} ({currentImageIndex + 1}/{galleryImages.length})
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  <p className='text-sm text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed'>
                    {club.description || 'No description available for this club.'}
                  </p>

                  {/* Club Details */}
                  <div className='space-y-3'>
                    {/* Rating */}
                    {averageRating > 0 && (
                      <div className='flex items-center gap-2'>
                        <Star className='w-4 h-4 text-yellow-500' fill='currentColor' />
                        <span className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
                          {averageRating.toFixed(1)}
                        </span>
                        <span className='text-xs text-zinc-500 dark:text-zinc-400'>
                          ({ratingCount} rating{ratingCount !== 1 ? 's' : ''})
                        </span>
                      </div>
                    )}

                    {/* Meeting Times */}
                    {club.meeting_times && (
                      <div className='flex items-start gap-2'>
                        <Clock className='w-4 h-4 text-zinc-500 dark:text-zinc-400 mt-0.5 flex-shrink-0' />
                        <div className='min-w-0'>
                          <p className='text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide font-medium'>
                            Meeting Times
                          </p>
                          <p className='text-sm text-zinc-900 dark:text-zinc-100'>
                            {club.meeting_times}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {club.location && (
                      <div className='flex items-start gap-2'>
                        <MapPin className='w-4 h-4 text-zinc-500 dark:text-zinc-400 mt-0.5 flex-shrink-0' />
                        <div className='min-w-0'>
                          <p className='text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide font-medium'>
                            Location
                          </p>
                          <p className='text-sm text-zinc-900 dark:text-zinc-100'>
                            {club.location}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Advisor */}
                    {club.advisor && (
                      <div className='flex items-start gap-2'>
                        <User className='w-4 h-4 text-zinc-500 dark:text-zinc-400 mt-0.5 flex-shrink-0' />
                        <div className='min-w-0'>
                          <p className='text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide font-medium'>
                            Advisor
                          </p>
                          <p className='text-sm text-zinc-900 dark:text-zinc-100'>
                            {club.advisor}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Member Count */}
                    {club.member_count && club.member_count > 0 && (
                      <div className='flex items-start gap-2'>
                        <Users className='w-4 h-4 text-zinc-500 dark:text-zinc-400 mt-0.5 flex-shrink-0' />
                        <div className='min-w-0'>
                          <p className='text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide font-medium'>
                            Members
                          </p>
                          <p className='text-sm text-zinc-900 dark:text-zinc-100'>
                            {club.member_count} member{club.member_count !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className='flex justify-between items-center px-4 py-3 border-t border-gray-100 dark:border-zinc-700'>
                  <button
                    type='button'
                    className='flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors'
                    onClick={closeMenu}
                    aria-label='Close popover'
                  >
                    <ArrowLeftIcon
                      size={14}
                      className='text-zinc-500 dark:text-zinc-400'
                    />
                    <span className='text-sm text-zinc-500 dark:text-zinc-400'>Back</span>
                  </button>

                  <button
                    className='relative flex h-8 shrink-0 select-none appearance-none items-center justify-center rounded-lg bg-blue-600 px-3 text-sm font-medium text-white transition-all hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98] dark:bg-blue-700 dark:hover:bg-blue-600'
                    onClick={handleViewMore}
                    aria-label='Explore club'
                  >
                    Explore
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export { ClubPopover };