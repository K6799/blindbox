import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlindBoxList from './pages/Blindbox/List';
import BlindBoxDetail from './pages/Blindbox/Detail';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Showcase from './pages/Showcase';
import SearchResults from './pages/Search';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<BlindBoxList />} />
                    <Route path="/blindbox/:id" element={<BlindBoxDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/showcase" element={<Showcase />} />
                    <Route path="/search" element={<SearchResults />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
