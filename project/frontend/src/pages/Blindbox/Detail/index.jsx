import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api';

export default function BlindboxDetail() {
  const { id } = useParams();
  const [box, setBox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get(`/blindboxes/${id}`)
      .then(data => {
        setBox(data);
        setLoading(false);
      })
      .catch(err => {
        setError('加载失败');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">加载中...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!box) return <div className="p-8">未找到盲盒</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">盲盒详情</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="h-40 bg-gray-200 mb-4 flex items-center justify-center">
          {box.image ? <img src={box.image} alt={box.name} className="h-full object-contain" /> : '无图片'}
        </div>
        <h2 className="font-bold text-lg">{box.name}</h2>
        <p className="mb-2">{box.description}</p>
        <div className="mb-2 text-blue-600 font-bold">￥{box.price}</div>
        <button className="bg-purple-500 text-white px-4 py-1 rounded" onClick={() => navigate(`/blindboxes/${id}/draw`)}>
          立即抽取
        </button>
      </div>
    </div>
  );
} 