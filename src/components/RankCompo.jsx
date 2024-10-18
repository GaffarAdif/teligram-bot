import React from 'react';

function Rank({ userData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">User Rankings</h2>
      {userData.map((user, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between">
          <span>{user.rank}. {user.name}</span>
          <span>{user.balance}</span>
        </div>
      ))}
    </div>
  );
}

export default Rank;
