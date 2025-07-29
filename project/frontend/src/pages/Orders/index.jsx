import React, { useState, useEffect } from 'react';
import { fetchDrawHistory } from '../../api';
import './Orders.css';

const Orders = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getHistory = async () => {
            try {
                const { data } = await fetchDrawHistory();
                setHistory(data);
            } catch (error) {
                console.error('Failed to fetch draw history:', error);
            } finally {
                setLoading(false);
            }
        };
        getHistory();
    }, []);

    if (loading) return <p>加载抽奖记录中...</p>;

    return (
        <div className="orders-container">
            <h1>我的抽盒记录</h1>
            {history.length === 0 ? (
                <p className="empty-history">你还没有抽过盲盒哦，快去试试手气吧！</p>
            ) : (
                <div className="history-list">
                    {history.map(record => (
                        <div key={record.id} className="history-item">
                            <img src={record.itemImage} alt={record.itemName} className="history-item-image"/>
                            <div className="history-item-info">
                                <p><strong>抽中:</strong> {record.itemName}</p>
                                <p><strong>稀有度:</strong> <span className={`rarity-tag rarity-${record.rarity}`}>{record.rarity}</span></p>
                                <p><strong>来自系列:</strong> {record.BlindBox ? record.BlindBox.name : '未知系列'}</p>
                                <p><strong>时间:</strong> {new Date(record.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;

