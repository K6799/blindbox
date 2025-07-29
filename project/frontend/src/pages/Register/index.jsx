import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as apiRegister } from '../../api';
import toast from 'react-hot-toast';
import '../Login/Login.css'; // 复用样式

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRegister(formData);
      toast.success('注册成功！请登录。');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || '注册失败');
    }
  };

  return (
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>注册</h2>
          <div className="form-group">
            <label>用户名</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>邮箱</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>密码</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="auth-button">注册</button>
          <p className="switch-auth">
            已有账户？ <Link to="/login">直接登录</Link>
          </p>
        </form>
      </div>
  );
};

export default Register;

