import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchShowcases, createShowcase } from '../../api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Showcase.css';

const Showcase = () => {
    const [showcases, setShowcases] = useState([]);
    const [comment, setComment] = useState('');
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const newItem = location.state?.newItem;

    useEffect(() => {
        const getShowcases = async () => {
            try {
                const { data } = await fetchShowcases();
                setShowcases(data);
            } catch (error) {
                console.error('Failed to fetch showcases:', error);
                toast.error('加载玩家秀失败');
            }
        };
        getShowcases();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newItem || !comment.trim()) {
            toast.error('请输入评论内容！');
            return;
        }

        const showcasePromise = createShowcase({
            comment,
            imageUrl: newItem.image,
            itemName: newItem.name
        });

        toast.promise(showcasePromise, {
            loading: '发布中...',
            success: (res) => {
                setShowcases([res.data, ...showcases]);
                setComment('');
                // 清除location.state, 防止刷新重复提交
                navigate('/showcase', { replace: true, state: {} });
                return '分享成功！';
            },
            error: '分享失败，请稍后再试'
        });
    };

    return (
        <div className="showcase-container">
            <h1>玩家秀广场</h1>

            {isAuthenticated && newItem && (
                <div className="showcase-form-container">
                    <h3>分享你的喜悦！</h3>
                    <div className="item-to-share">
                        <img src={newItem.image} alt={newItem.name} />
                        <p>{newItem.name}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="说点什么吧..."
                required
            ></textarea>
                        <button type="submit">发布分享</button>
                    </form>
                </div>
            )}

            <div className="showcase-grid">
                {showcases.map((item) => (
                    <div key={item.id} className="showcase-card">
                        <img src={item.imageUrl} alt={item.itemName} className="showcase-image" />
                        <div className="showcase-info">
                            <p className="showcase-comment">"{item.comment}"</p>
                            <p className="showcase-user">- {item.User?.username || '匿名用户'}</p>
                            <p className="showcase-itemname">抽中: {item.itemName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Showcase;
