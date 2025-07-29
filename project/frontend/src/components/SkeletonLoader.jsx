import React from 'react';
import './SkeletonLoader.css';

const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
        </div>
    </div>
);

const SkeletonLoader = ({ count = 6 }) => {
    return (
        <div className="blindbox-grid">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
};

export default SkeletonLoader;