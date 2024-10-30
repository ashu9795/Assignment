// HistoryModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryModal = ({ historyType, onClose }) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data based on history type
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      let url = "";
      if (historyType === "daily") {
        url = "http://localhost:7000/api/user/v1/your-daily-history";
      } else if (historyType === "weekly") {
        url = "http://localhost:7000/api/user/v1/your-weekly-history";
      } else if (historyType === "monthly") {
        url = "http://localhost:7000/api/user/v1/your-monthly-history";
      }

      try {
        const response = await axios.get(url);
        console.log('Fetched history data:', response.data.data); // Log the fetched data
        setHistoryData(response.data.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [historyType]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
          {historyType.charAt(0).toUpperCase() + historyType.slice(1)} History
        </h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2 sm:space-y-3">
              {historyData.length > 0 ? (
                historyData.map((entry) => (
                  <li key={entry._id} className="p-2 sm:p-3 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-semibold">{entry._id}</span>
                    <span className="text-xs sm:text-sm text-blue-600">+{entry.totalPointsAwarded || entry.totalPoints} points</span>
                  </li>
                ))
              ) : (
                <p>No data available for this period.</p>
              )}
            </ul>
          </div>
        )}

        <button onClick={onClose} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;
