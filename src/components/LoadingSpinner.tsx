import React from 'react';
import PulseLoader from './PulseLoader';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    fullScreen = false
}) => {
    const containerClasses = fullScreen
        ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
        : 'flex items-center justify-center p-4';

    return (
        <div className={containerClasses}>
            <PulseLoader size={size} />
        </div>
    );
};

export default LoadingSpinner; 