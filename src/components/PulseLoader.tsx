import React from 'react';
import { motion } from "framer-motion";

interface PulseLoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: 'blue' | 'white' | 'gray';
    className?: string;
}

const PulseLoader: React.FC<PulseLoaderProps> = ({
    size = 'medium',
    color = 'blue',
    className = ''
}) => {
    const sizeClasses = {
        small: 'w-2 h-2',
        medium: 'w-3 h-3',
        large: 'w-4 h-4'
    };

    const colorClasses = {
        blue: 'bg-blue-500',
        white: 'bg-white',
        gray: 'bg-gray-500'
    };

    const spacingClasses = {
        small: 'space-x-1',
        medium: 'space-x-2',
        large: 'space-x-3'
    };

    return (
        <div className={`flex items-center justify-center ${spacingClasses[size]} ${className}`}>
            <motion.div
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                }}
            />
            <motion.div
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                }}
            />
        </div>
    );
};

export default PulseLoader; 