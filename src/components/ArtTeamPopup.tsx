import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Star, BookmarkIcon, MapPin, Users, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';

interface ArtTeamPopupProps {
    isOpen: boolean;
    onClose: () => void;
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
    };
    averageRating?: number;
    ratingCount?: number;
}

const ArtTeamPopup: React.FC<ArtTeamPopupProps> = ({
    isOpen,
    onClose,
    club,
    averageRating = 0,
    ratingCount = 0
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const bookmarked = isBookmarked(club.id?.toString() || club.slug || '');

    // Art Team gallery photos
    const galleryImages = [
        {
            src: "/ClubGalleryPhotos/ArtTeam1.jpg",
            caption: "Art Team exhibition showcase"
        },
        {
            src: "/ClubGalleryPhotos/ArtTeam2.jpg",
            caption: "Art Team collaborative workshop"
        },
        {
            src: "/ClubGalleryPhotos/ArtTeam3.jpg",
            caption: "Art Team creative session"
        },
        {
            src: "/ClubGalleryPhotos/ArtTeam4.jpg",
            caption: "Art Team community art project"
        }
    ];

    const handleBookmarkToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleBookmark(club.id?.toString() || club.slug || '');
    };

    const handleViewMore = () => {
        const clubSlug = club.slug || club.name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/club/${clubSlug}`);
        onClose();
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">{club.name}</h2>
                            {club.category && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                    {club.category}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleBookmarkToggle}
                                className={`p-2 rounded-lg transition-colors ${bookmarked
                                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                <BookmarkIcon size={20} fill={bookmarked ? 'currentColor' : 'none'} />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)]">
                        {/* Gallery Section - Left Side */}
                        <div className="lg:w-2/3 p-6">
                            <div className="space-y-4">
                                {/* Main Image Display */}
                                <div className="relative">
                                    <motion.img
                                        key={currentImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        src={galleryImages[currentImageIndex].src}
                                        alt={galleryImages[currentImageIndex].caption}
                                        className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                                    />

                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                {/* Image Caption */}
                                <p className="text-center text-gray-600 font-medium">
                                    {galleryImages[currentImageIndex].caption}
                                </p>

                                {/* Thumbnail Navigation */}
                                <div className="flex justify-center gap-2">
                                    {galleryImages.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToImage(index)}
                                            className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${index === currentImageIndex
                                                    ? 'ring-2 ring-blue-500 scale-110'
                                                    : 'opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.caption}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Club Info Section - Right Side */}
                        <div className="lg:w-1/3 p-6 bg-gray-50 space-y-6 overflow-y-auto">
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Club</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {club.description || 'No description available for this club.'}
                                </p>
                            </div>

                            {/* Rating */}
                            {averageRating > 0 && (
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                                    <span className="text-lg font-semibold text-gray-900">
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        ({ratingCount} rating{ratingCount !== 1 ? 's' : ''})
                                    </span>
                                </div>
                            )}

                            {/* Club Details */}
                            <div className="space-y-4">
                                {club.meeting_times && (
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Meeting Times</p>
                                            <p className="text-sm text-gray-600">{club.meeting_times}</p>
                                        </div>
                                    </div>
                                )}

                                {club.location && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Location</p>
                                            <p className="text-sm text-gray-600">{club.location}</p>
                                        </div>
                                    </div>
                                )}

                                {club.advisor && (
                                    <div className="flex items-start gap-3">
                                        <User className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Advisor</p>
                                            <p className="text-sm text-gray-600">{club.advisor}</p>
                                        </div>
                                    </div>
                                )}

                                {club.member_count && club.member_count > 0 && (
                                    <div className="flex items-start gap-3">
                                        <Users className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Members</p>
                                            <p className="text-sm text-gray-600">
                                                {club.member_count} member{club.member_count !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Button */}
                            <div className="pt-4">
                                <button
                                    onClick={handleViewMore}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                                >
                                    Explore Full Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ArtTeamPopup;

