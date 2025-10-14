import React from 'react';
import { AnimatedTestimonials } from './ui/animated-testimonials';

const AnimatedTestimonialsDemo = () => {
  // Static content for a sample club
  const clubQuote = "Join our vibrant community where students explore aquatic life through hands-on experience and scientific inquiry. We foster appreciation and understanding of marine ecosystems.";
  const clubDesignation = "Science • Advisor: Dr. Fisher";

  // List of members with their names and corresponding photos
  const members = [
    {
      name: "The Aquarist Club",
      src: "/ClubGalleryPhotos/TheAquarist1.jpg",
    },
    {
      name: "Marine Research",
      src: "/ClubGalleryPhotos/TheAquarist2.jpg",
    },
    {
      name: "Field Studies",
      src: "/ClubGalleryPhotos/TheAquarist3.jpg",
    },
    {
      name: "Lab Activities",
      src: "/ClubGalleryPhotos/TheAquarist4.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎭 Animated Club Modal Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the new animated testimonials component in action. This showcases how club modals now display with beautiful animations and gallery rotation.
          </p>
        </div>
        
        <AnimatedTestimonials 
          members={members} 
          quote={clubQuote} 
          designation={clubDesignation}
          autoplay={true}
        />
        
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">✨ New Modal Features</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-lg mb-2">🎨 Dynamic Gallery</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Rotating club photos</li>
                  <li>• Smooth transitions</li>
                  <li>• Random rotation effects</li>
                  <li>• Auto-play functionality</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">🎭 Animations</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Spring-based transitions</li>
                  <li>• Layered photo stacking</li>
                  <li>• Smooth name transitions</li>
                  <li>• Interactive navigation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">📱 Responsive</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Mobile-first design</li>
                  <li>• Adaptive layouts</li>
                  <li>• Touch-friendly controls</li>
                  <li>• Accessibility features</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnimatedTestimonialsDemo };