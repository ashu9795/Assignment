// Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users and display them
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/user/v1/get-users');
        console.log("Full API response:", response);

        const userData = Array.isArray(response.data) 
          ? response.data 
          : Array.isArray(response.data.data) 
            ? response.data.data 
            : [];

        if (userData.length >= 10) {
          setUsers(userData.slice(0, userData.length)); // Display all users
        } else {
          setUsers(userData); // Display all users if fewer than 10
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle point claim for a user
  const handleClaimPoints = async (username) => {
    try {
      const response = await axios.patch(
        'http://localhost:7000/api/user/v1/claim-points',
        { username: username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.username === username
              ? { ...user, Points: user.Points + 1 }
              : user
          )
        );
      } else {
        console.error("Failed to claim points. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error claiming points:", error);
      if (error.response) {
        console.error("Backend response error:", error.response.data);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Friends List</h1>
      <ul className="space-y-3 max-w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center bg-gray-100 p-2 sm:p-4 rounded hover:bg-gray-200"
          >
            <div className="flex items-center">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm md:text-base  lg:text-lg ml-1">
                {user.firstName} {user.lastName} - {user.Points } points
              </span>
            </div>
            <button
              onClick={() => handleClaimPoints(user.username)}
              className="bg-blue-500 text-white px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 rounded text-xs md:text-sm lg:text-base hover:bg-blue-600"
            >
              Claim Point
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
