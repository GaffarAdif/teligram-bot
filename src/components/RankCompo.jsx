import React from 'react';

function Rank({ userData, currentUserId }) {
  // Slice the userData to get the top 100 users
  const topUsers = userData.slice(0, 100);

  // Find the current user's data and rank
  const currentUser = userData.find((user) => user.UserId === currentUserId);
  const currentUserRank = userData.findIndex((user) => user.UserId === currentUserId) + 1;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">User Rankings</h2>

      {/* Section to display current user's rank if the user is found */}
      {currentUser && currentUserRank > 0 && (
        <div className="bg-blue-600 p-4 rounded-lg shadow-md flex justify-between mb-6">
          <span>My Rank: {currentUserRank}</span>
          <span>{currentUser.name}</span>
          <span>{currentUser.Balance}</span>
        </div>
      )}

      {/* Top 100 users section */}
      <h3 className="text-xl font-semibold mb-4">Top 100 Users</h3>
      {topUsers.map((user, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between">
          <span>{index + 1}. {user.name}</span>
          <span>{user.Balance}</span>
        </div>
      ))}

      {/* Section to display current user's rank outside top 100 */}
      {currentUser && currentUserRank > 100 && (
        <div className="bg-yellow-600 p-4 rounded-lg shadow-md flex justify-between mt-6">
          <span>Your Rank: {currentUserRank} (Outside Top 100)</span>
          <span>{currentUser.name}</span>
          <span>{currentUser.Balance}</span>
        </div>
      )}
    </div>
  );
}

export default Rank;
