import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return <p>请先登录。</p>;
    }

    // 安全地处理余额显示，如果余额不是有效数字，则默认为 0.00
    const userBalance = (Number(user.balance) || 0).toFixed(2);

    return (
        <div className="profile-container">
            <h2>个人中心</h2>
            <div className="profile-card">
                <p><strong>用户名:</strong> {user.username}</p>
                <p><strong>邮箱:</strong> {user.email}</p>
                <p><strong>账户余额:</strong> <span className="balance">¥{userBalance}</span></p>
                <p><strong>角色:</strong> {user.role === 'admin' ? '管理员' : '普通用户'}</p>
            </div>
        </div>
    );
};

export default Profile;