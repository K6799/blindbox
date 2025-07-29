import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchBlindBoxes } from '../../api';
import BlindBoxCard from '../../components/BlindBoxCard';
import SkeletonLoader from '../../components/SkeletonLoader';
import '../Blindbox/List/List.css'; // 复用列表页样式

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            const getResults = async () => {
                setLoading(true);
                try {
                    const { data } = await searchBlindBoxes(query);
                    setResults(data);
                } catch (error) {
                    console.error('Failed to search:', error);
                } finally {
                    setLoading(false);
                }
            };
            getResults();
        }
    }, [query]);

    return (
        <div className="blindbox-list-container">
            <h1>搜索结果: "{query}"</h1>
            {loading ? (
                <SkeletonLoader count={3} />
            ) : results.length > 0 ? (
                <div className="blindbox-grid">
                    {results.map((box) => (
                        <BlindBoxCard key={box.id} box={box} />
                    ))}
                </div>
            ) : (
                <p>没有找到相关的盲盒。</p>
            )}
        </div>
    );
};

export default SearchResults;
