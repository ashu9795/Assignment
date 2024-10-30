import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Registration from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Leaderboard from './pages/LeaderBoard.jsx';
import Home from './pages/Home.jsx';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes> {/* Wrap Route components with Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
