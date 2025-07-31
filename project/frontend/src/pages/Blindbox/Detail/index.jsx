import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlindBoxDetail, drawBlindBox } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import './Detail.css';

const BlindBoxDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, updateUserBalance } = useAuth();
  const [blindBox, setBlindBox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawResult, setDrawResult] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data } = await fetchBlindBoxDetail(id);
        if (typeof data.items === 'string') {
          data.items = JSON.parse(data.items);
        }
        setBlindBox(data);
      } catch (error) {
        console.error('Failed to fetch blind box detail:', error);
        toast.error('加载盲盒信息失败。');
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [id]);

  const handleDraw = async () => {
    if (!isAuthenticated) {
      toast.error('请先登录再进行抽盒！');
      navigate('/login');
      return;
    }

    if (parseFloat(user.balance) < parseFloat(blindBox.price)) {
      toast.error('余额不足，快去充值吧！');
      return;
    }

    setIsDrawing(true);
    setDrawResult(null);

    const drawPromise = drawBlindBox(id);

    toast.promise(drawPromise, {
      loading: '正在开启神秘盲盒...',
      success: (res) => {
        setDrawResult(res.data.drawnItem);
        updateUserBalance(res.data.newBalance);
        return `恭喜你抽中了 ${res.data.drawnItem.name}!`;
      },
      error: (err) => {
        setIsDrawing(false);
        return err.response?.data?.message || '抽盒失败，请稍后再试。';
      }
    });

    drawPromise.finally(() => {
      setTimeout(() => setIsDrawing(false), 4000);
    });
  };

  if (loading) return <p className="loading-text">正在加载盲盒详情...</p>;
  if (!blindBox) return <p>未找到该盲盒。</p>;

  return (
      <div className="detail-container">
        <div className="detail-content">
          <img src={blindBox.imageUrl} alt={blindBox.name} className="detail-image" />
          <div className="detail-info">
            <h1>{blindBox.name}</h1>
            <p className="detail-description">{blindBox.description}</p>
            <div className="item-preview">
              <h4>可能包含：</h4>
              <div className="item-list">
                {blindBox.items.map((item, index) => (
                    <div key={index} className="item-chip">
                      {item.name} <span className={`rarity-tag rarity-${item.rarity}`}>{item.rarity}</span>
                    </div>
                ))}
              </div>
            </div>
            <p className="detail-price">价格: <span>¥{blindBox.price}</span></p>
            {isAuthenticated && <p className="user-balance">我的余额: ¥{user.balance}</p>}
            <button onClick={handleDraw} disabled={isDrawing} className="draw-button">
              {isDrawing ? '开盒中...' : '立即抽一发！'}
            </button>
          </div>
        </div>

        {isDrawing && !drawResult && (
            <div className="draw-modal">
              <div className="draw-animation">
                <div className="box-shake">
                  <div className="box">
                    <div className="box-body">
                      <div className="box-lid"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}

        {drawResult && (
            <div className="draw-modal">
              <div className="result-content">
                <h2>恭喜你抽中了！</h2>
                <img src={drawResult.image} alt={drawResult.name} className="result-image" />
                <h3>{drawResult.name}</h3>
                <p>稀有度: <span className={`rarity-tag rarity-${drawResult.rarity}`}>{drawResult.rarity}</span></p>
                <div className="result-buttons">
                  {/* 【修复】将按钮文字从“再抽一次”改为“退出”，并修改点击事件为关闭弹窗 */}
                  <button onClick={() => setDrawResult(null)} className="close-button">退出</button>
                  <button onClick={() => { setDrawResult(null); navigate('/showcase', { state: { newItem: drawResult } }); }} className="showcase-button">去玩家秀分享</button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default BlindBoxDetail;
