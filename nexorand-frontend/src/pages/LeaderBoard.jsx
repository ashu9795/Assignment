// Leaderboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryModal from "./HistoryModal";
import UserHistoryModal from "./userHistoryModel.jsx"; // Import new component

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [historyType, setHistoryType] = useState("daily");
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isUserHistoryModalOpen, setIsUserHistoryModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userHistory, setUserHistory] = useState([]);

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

  const handleHistoryClick = (type) => {
    setHistoryType(type);
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  const closeUserHistoryModal = () => {
    setIsUserHistoryModalOpen(false);
    setSelectedUser(null);
    setUserHistory([]);
  };

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setIsUserHistoryModalOpen(true);

    try {
      const response = await axios.post("http://localhost:7000/api/user/v1/your-history", {
        username: user.username,
      });
      setUserHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Leaderboard</h1>
      
      <div className="flex space-x-2 justify-center mb-6">
        {["daily", "weekly", "monthly"].map((type) => (
          <button
            key={type}
            onClick={() => handleHistoryClick(type)}
            className={`px-4 py-2 rounded-full ${
              historyType === type ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-700"
            } hover:bg-orange-400`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center mb-6">
        {users.slice(0, 3).map((user, index) => (
          <div key={user._id} className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 m-2">
            <span className="text-lg font-semibold text-gray-800">{`${user.firstName} ${user.lastName}`}</span>
            <span className="text-md text-gray-600">Rank: {index + 1}</span>
            <span className="text-md text-green-500">{user.Points} points</span>
          </div>
        ))}
      </div>

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
                  <path
                    d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm sm:text-base font-semibold text-gray-800 ml-1">
                  {user.username}
                </span>
              </div>
              <span className="text-sm sm:text-base text-gray-600 ml-1">Rank: {index + 1}</span>
            </div>
            <span className="text-sm sm:text-base text-green-500">{user.Points} points</span>
          </li>
        ))}
      </ul>

      {isHistoryModalOpen && <HistoryModal historyType={historyType} onClose={closeHistoryModal} />}
      {isUserHistoryModalOpen && (
        <UserHistoryModal
          isOpen={isUserHistoryModalOpen}
          onClose={closeUserHistoryModal}
          history={userHistory}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default Leaderboard;
