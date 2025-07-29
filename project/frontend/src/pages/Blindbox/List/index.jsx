import React, { useState, useEffect } from 'react';
import { fetchBlindBoxes } from '../../../api';
import BlindBoxCard from '../../../components/BlindBoxCard';
import SkeletonLoader from '../../../components/SkeletonLoader';
import './List.css';

const BlindBoxList = () => {
    const [blindBoxes, setBlindBoxes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBlindBoxes = async () => {
            try {
                const { data } = await fetchBlindBoxes();
                setBlindBoxes(data);
            } catch (error) {
                console.error('Failed to fetch blind boxes:', error);
            } finally {
                setTimeout(() => setLoading(false), 500); // 模拟加载效果
            }
        };
        getBlindBoxes();
    }, []);

    return (
        <div className="blindbox-list-container">
            <h1>热门盲盒</h1>
            {loading ? (
                <SkeletonLoader count={3} />
            ) : (
                <div className="blindbox-grid">
                    {blindBoxes.map((box) => (
                        <BlindBoxCard key={box.id} box={box} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlindBoxList;