// UserHistoryModal.jsx
import React from "react";

const UserHistoryModal = ({ isOpen, onClose, history, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-lg"
        >
          &times;
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-center">{user?.firstName}'s Test History</h2>
        
        {history && history.length > 0 ? (
          <ul className="space-y-2 max-h-80 overflow-y-auto">
            {console.log('Fetched history data:', history)} {/* Log the fetched data */}
            {history.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-300">
                <span className="text-gray-800 font-semibold">{item.date}</span>
                <span className="flex items-center">
                  <span className="text-gray-900">Points Awarded:</span>
                  <span className="text-green-500 ml-1 font-bold">{item.pointsAwarded}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No history available for this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserHistoryModal;
