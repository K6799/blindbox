import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as apiLogin } from '../../api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiLogin(formData);
      login(data.user, data.token);
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || '登录失败');
    }
  };

  return (
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>登录</h2>
          <div className="form-group">
            <label>邮箱</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>密码</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="auth-button">登录</button>
          <p className="switch-auth">
            还没有账户？ <Link to="/register">立即注册</Link>
          </p>
        </form>
      </div>
  );
};

export default Login;