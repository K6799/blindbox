import { useEffect, useState } from 'react';
import api from '../../../api';
import { useNavigate } from 'react-router-dom';

export default function BlindboxList() {
  const [blindboxes, setBlindboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get('/blindboxes')
      .then(data => {
        setBlindboxes(data);
        setLoading(false);
      })
      .catch(err => {
        setError('加载失败');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">盲盒列表</h1>
      {loading && <div>加载中...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blindboxes.map(box => (
          <div key={box.id} className="bg-white p-4 rounded shadow flex flex-col">
            <div className="h-32 bg-gray-200 mb-2 flex items-center justify-center">
              {box.image ? <img src={box.image} alt={box.name} className="h-full object-contain" /> : '无图片'}
            </div>
            <h2 className="font-bold">{box.name}</h2>
            <p className="flex-1">{box.description}</p>
            <div className="mt-2 text-blue-600 font-bold">￥{box.price}</div>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => navigate(`/blindboxes/${box.id}`)}
            >
              查看详情
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 