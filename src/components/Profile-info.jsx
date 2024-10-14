import React from 'react';

const ProfileInfo = ({ avatarUrl, name, balance }) => {
  return (
    <div className="flex items-center p-5 bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 max-w-md transform hover:scale-105">
      <img 
        src={avatarUrl} 
        alt="User Avatar" 
        className="w-20 h-20 rounded-full mr-5 border-4 border-blue-500 shadow-md transition-transform duration-300 hover:scale-110" 
      />
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide">{name}</h2>
        <p className="text-gray-300 text-lg mt-2">
          Balance: <span className="font-semibold text-green-400">{balance} MFT</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
