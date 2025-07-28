import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Draw from '../pages/Draw';
import BlindboxList from '../pages/Blindbox/List';
import BlindboxDetail from '../pages/Blindbox/Detail';
import Orders from '../pages/Orders';
import Showcase from '../pages/Showcase';
import Search from '../pages/Search';
import Profile from '../pages/Profile';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/blindboxes" element={<BlindboxList />} />
        <Route path="/blindboxes/:id" element={<BlindboxDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/showcases" element={<Showcase />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/blindboxes" />} />
      </Routes>
    </BrowserRouter>
  );
} 