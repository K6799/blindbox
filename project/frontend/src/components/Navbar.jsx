import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm.trim()}`);
            setSearchTerm('');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="nav-logo">🎁 盲盒商城</Link>
                <Link to="/showcase" className="nav-item">玩家秀</Link>
            </div>
            <div className="nav-center">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="搜索你喜欢的系列..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">🔍</button>
                </form>
            </div>
            <div className="nav-right">
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="nav-item">👤 {user.username}</Link>
                        <Link to="/orders" className="nav-item">我的记录</Link>
                        <button onClick={handleLogout} className="nav-button logout-button">退出</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-item">登录</Link>
                        <Link to="/register" className="nav-button">注册</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
