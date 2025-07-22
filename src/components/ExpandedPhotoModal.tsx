import React from "react";
import {
    Dialog,
    DialogContent,
    DialogClose,
} from "./ui/dialog";
import { X } from "lucide-react";

interface ExpandedPhotoModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    caption: string;
}

const ExpandedPhotoModal = ({
    isOpen,
    onClose,
    imageUrl,
    caption,
}: ExpandedPhotoModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-black/90 p-0 border-0">
                <DialogClose className="absolute right-4 top-4 z-50">
                    <X className="h-6 w-6 text-white" />
                </DialogClose>
                <div className="relative w-full h-full">
                    <img
                        src={imageUrl}
                        alt={caption}
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white text-lg">{caption}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ExpandedPhotoModal; 