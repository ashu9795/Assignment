// src/components/UserModal.jsx
import React from 'react';

const UserModal = ({ userInfo, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
                <h2 className="text-lg font-bold mb-4">User Information</h2>
                <p><strong>Name:</strong> {userInfo?.firstName} {userInfo?.lastName}</p>
                <p><strong>Email:</strong> {userInfo?.email}</p>
                <p><strong>Points:</strong> {userInfo?.Points}</p>
                <button 
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserModal;
