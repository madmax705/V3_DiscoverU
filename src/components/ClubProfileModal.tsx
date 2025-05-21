import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import ClubProfile from "./ClubProfile";
import { X } from "lucide-react";

export interface ClubData {
  id: string;
  name: string;
  category: string;
  bannerUrl: string;
  logoUrl: string;
  mission: string;
  meetingTimes: string;
  location: string;
  leaders: {
    name: string;
    role: string;
    photoUrl: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
  achievements: {
    title: string;
    date: string;
    description: string;
  }[];
  galleryImages: string[];
}

interface ClubProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubData: ClubData;
  className?: string;
  isLoading?: boolean;
}

const ClubProfileModal = ({
  isOpen = true,
  onClose = () => {},
  clubData,
  className = "",
  isLoading = false,
}: ClubProfileModalProps) => {
  // Reset scroll position when modal opens or club changes
  React.useEffect(() => {
    if (isOpen) {
      // Find the dialog content and reset its scroll position
      setTimeout(() => {
        const dialogContent = document.querySelector(
          ".max-h-\\[90vh\\].overflow-y-auto",
        );
        if (dialogContent) {
          dialogContent.scrollTop = 0;
        }
      }, 50); // Small delay to ensure the DOM is updated
    }
  }, [isOpen, clubData?.id]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`max-w-4xl max-h-[90vh] overflow-y-auto bg-blue-500 p-6 border-0 ${className}`}
      >
        <DialogHeader className="flex justify-between items-center relative">
          <DialogClose className="absolute right-0 top-0">
            <X className="h-6 w-6 text-white" />
          </DialogClose>
          <DialogTitle className="text-2xl font-bold text-white">
            {clubData.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              <p className="mt-4 text-white">Loading club details...</p>
            </div>
          ) : (
            <ClubProfile {...clubData} onClose={onClose} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClubProfileModal;
