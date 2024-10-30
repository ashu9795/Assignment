// Leaderboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryModal from "./HistoryModal";

const Leaderboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [historyType, setHistoryType] = useState("daily"); // Default is daily
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  // Fetch all users and sort them by points in descending order
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/user/v1/get-users");
        const sortedUsers = response.data.data.sort((a, b) => b.Points - a.Points);
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch points history when a user is selected
  const handleUserClick = async (user) => {
    console.log("User clicked:", user.username);
    setSelectedUser(user);
    setIsModalOpen(true);
    try {
      const response = await axios.post("http://localhost:7000/api/user/v1/your-history", {
        username: user.username,
      });
      console.log("User history:", response.data.data);
      setHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  // Fetch history data based on selected timeframe
  const handleHistoryClick = async (type) => {
    setHistoryType(type);
    setIsModalOpen(true);

    try {
      const response = await axios.post(`http://localhost:7000/api/user/v1/history`, {
        type: type, // Pass the history type (daily, weekly, monthly)
      });
      setHistoryData(response.data.data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
    setHistoryData([]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Leaderboard</h1>
      
      {/* View Selector Buttons */}
      <div className="flex space-x-2 justify-center mb-6">
        <button
          onClick={() => handleHistoryClick("daily")}
          className={`px-4 py-2 rounded-full ${historyType === "daily" ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-700"} hover:bg-orange-400`}
        >
          Daily
        </button>
        <button
          onClick={() => handleHistoryClick("weekly")}
          className={`px-4 py-2 rounded-full ${historyType === "weekly" ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-700"} hover:bg-orange-400`}
        >
          Weekly
        </button>
        <button
          onClick={() => handleHistoryClick("monthly")}
          className={`px-4 py-2 rounded-full ${historyType === "monthly" ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-700"} hover:bg-orange-400`}
        >
          Monthly
        </button>
      </div>

      {/* Top Three Users */}
      <div className="flex flex-col sm:flex-row justify-center mb-6">
        {users.slice(0, 3).map((user, index) => (
          <div key={user._id} className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 m-2">
            <span className="text-lg font-semibold text-gray-800">{user.firstName + " " + user.lastName}</span>
            <span className="text-md text-gray-600">Rank: {index + 1}</span>
            <span className="text-md text-green-500">{user.Points} points</span>
          </div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <ul className="max-w-full md:max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {users.slice(0, 10).map((user, index) => (
          <li
            key={user._id}
            className="flex justify-between items-center p-3 sm:p-4 border-b cursor-pointer hover:bg-gray-50"
            onClick={() => handleUserClick(user)}
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm sm:text-base font-semibold text-gray-800 ml-1">{user.username}</span>
              </div>
              <span className="text-sm sm:text-base text-gray-600 ml-1">Rank: {index + 1}</span>
            </div>
            <span className="text-sm sm:text-base text-green-500">{user.Points} points</span>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              {selectedUser?.firstName}'s Test History
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {history.map((entry) => (
                <li
                  key={entry._id}
                  className="p-2 sm:p-3 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
                >
                  <span className="text-xs sm:text-sm">Date: {formatDate(entry.date)}</span>
                  <span className="text-xs sm:text-sm font-semibold text-blue-600">
                    +{entry.pointsAwarded} points awarded
                  </span>
                </li>
              ))}
            </ul>

            <HistoryModal
              historyData={historyData} // Pass the fetched history data
              historyType={historyType} // Pass the history type (daily, weekly, monthly)
              onClose={closeModal} // Modal close handler
            />
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
