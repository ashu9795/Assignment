// src/components/Navbar.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UserModal from './UserModal'; // Import the UserModal component

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('http://localhost:7000/api/user/v1/get-users-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ userId: user.data._id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUserInfo(data.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserInfo(); // Fetch user info if user is logged in
        }
    }, [user]);

    return (
        <>
            <nav className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-4">
                <div className="flex justify-between items-center w-full">
                    <button
                        className="md:hidden p-2 text-gray-700 focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        <span className="text-white">
  {isMobileMenuOpen ? '✖️' : '☰'}
</span>

                    </button>
                    <div className={`flex ${isMobileMenuOpen ? 'flex' : 'hidden'} md:block md:flex-row md:space-x-4 w-full`}>
                        <Link to="/" className={`text-white hover:bg-gray-500 px-3 py-2 rounded transition duration-300 ${location.pathname === '/' ? 'bg-gray-400' : ''}`}>
                            Home
                        </Link>
                        <Link to="/leaderboard" className={`text-white hover:bg-gray-500 px-3 py-2 rounded transition duration-300 ${location.pathname === '/leaderboard' ? 'bg-gray-400' : ''}`}>
                            Leaderboard
                        </Link>
                        {!user && (
                            <Link to="/login" className={`text-white hover:bg-gray-500 px-3 py-2 rounded transition duration-300 ${location.pathname === '/login' ? 'bg-gray-400' : ''}`}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* User Icon and Logout button on the right */}
                <div className="flex items-center space-x-2 mt-2 md:mt-0 ml-auto pr-5">
                    {user ? (
                        <>
                            <img
                                src="user.svg"
                                alt="User Icon"
                                className="w-8 gap-9 h-8 cursor-pointer"
                                onClick={() => setIsModalOpen(true)} // Open modal on click
                            />
                            <button
                                className="bg-red-500 rounded-lg  text-white px-2 py-1 hover:bg-red-600 transition duration-300 text-sm"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    ) : null}
                </div>
            </nav>

            {/* Modal to show user info */}
            {isModalOpen && (
                <UserModal 
                    userInfo={userInfo} 
                    onClose={() => setIsModalOpen(false)} // Close modal function
                />
            )}
        </>
    );
};

export default Navbar;