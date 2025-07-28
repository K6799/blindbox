import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/user/login', { username, password });
      // 假设后端返回 token
      localStorage.setItem('token', res.token);
      navigate('/blindboxes');
    } catch (err) {
      setError(err.response?.data?.message || '登录失败');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">登录</h1>
      <form className="w-80 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="用户名/邮箱"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          type="password"
          placeholder="密码"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">登录</button>
      </form>
    </div>
  );
} 