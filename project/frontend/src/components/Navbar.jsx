import { Link, useLocation } from 'react-router-dom';

const navs = [
  { to: '/blindboxes', label: '盲盒商城' },
  { to: '/draw', label: '抽盒机' },
  { to: '/orders', label: '订单' },
  { to: '/showcases', label: '玩家秀' },
  { to: '/search', label: '搜索' },
  { to: '/profile', label: '个人中心' },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white shadow flex items-center px-6 py-2 mb-6">
      <div className="font-bold text-xl mr-8">盲盒系统</div>
      <div className="flex-1 flex gap-4">
        {navs.map(nav => (
          <Link
            key={nav.to}
            to={nav.to}
            className={`hover:text-blue-600 ${location.pathname.startsWith(nav.to) ? 'text-blue-600 font-bold' : ''}`}
          >
            {nav.label}
          </Link>
        ))}
      </div>
      <div>
        <Link to="/login" className="mr-2 text-gray-600 hover:text-blue-600">登录</Link>
        <Link to="/register" className="text-gray-600 hover:text-blue-600">注册</Link>
      </div>
    </nav>
  );
} 