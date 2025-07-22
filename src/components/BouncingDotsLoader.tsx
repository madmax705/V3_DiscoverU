import React from 'react';
import PulseLoader from './PulseLoader';

const BouncingDotsLoader = () => {
    return (
        <div className="flex items-center justify-center h-full w-full py-20">
            <PulseLoader size="large" />
        </div>
    );
};

export default BouncingDotsLoader; 