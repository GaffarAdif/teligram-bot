import React from 'react';

const ProfileInfo = ({ avatarUrl, name, balance }) => {
  return (
    <div className="flex items-center p-4 border border-gray-700 rounded-lg shadow-md max-w-md bg-gray-800">
      <img src={avatarUrl} alt="User Avatar" className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-400">Balance : {balance}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
