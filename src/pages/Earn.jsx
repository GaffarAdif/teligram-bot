import React, { useState } from 'react';

// Sample task data
const taskData = [
  {
    type: 'Task',
    name: 'Mining',
    instructions: 'Participate in our mining pool and earn rewards by contributing your computational power.',
    link: '#', // Replace with actual link
  },
  {
    type: 'Task',
    name: 'Staking',
    instructions: 'Lock your assets in our staking program to earn passive income on your holdings.',
    link: '#', // Replace with actual link
  },
  {
    type: 'Task',
    name: 'Affiliate Program',
    instructions: 'Refer friends to our platform and earn commissions on their mining activities.',
    link: '#', // Replace with actual link
  },
  {
    type: 'Refer',
    name: 'Referral Program',
    instructions: 'Join our referral program and earn rewards for bringing new users to the platform!',
    link: '#', // Replace with actual link
  },
  {
    type: 'Refer',
    name: 'How It Works',
    instructions: 'Share your referral link with friends and earn a percentage of their earnings.',
    link: '#', // Replace with actual link
  },
  {
    type: 'Refer',
    name: 'Referral Rewards',
    instructions: 'Enjoy bonuses for each new user who joins through your referral link!',
    link: '#', // Replace with actual link
  },
];

// Sample user data with rank numbers
const userData = [
  { rank: 1, name: 'Alice', balance: '3.0 ETH' },
  { rank: 2, name: 'Bob', balance: '2.5 ETH' },
  { rank: 3, name: 'Charlie', balance: '1.0 ETH' },
];

function Earn() {
  // State to track the current mode (Task, Refer, or User Rank)
  const [mode, setMode] = useState('Task');

  // Function to set mode
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Ways to Earn Cryptocurrency</h1>
      <p className="mb-4">
        Discover various methods to earn cryptocurrency and maximize your profits!
      </p>

      {/* Button to switch between Task, Refer, and User Rank modes */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleModeChange('Task')}
          className={`px-4 py-2 rounded ${mode === 'Task' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Task
        </button>
        <button
          onClick={() => handleModeChange('Refer')}
          className={`px-4 py-2 rounded ${mode === 'Refer' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Refer
        </button>
        <button
          onClick={() => handleModeChange('User Rank')}
          className={`px-4 py-2 rounded ${mode === 'User Rank' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          User Rank
        </button>
      </div>

      {/* Conditional rendering based on the selected mode */}
      {mode === 'User Rank' ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">User Rankings</h2>
          {userData.map((user, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between">
              <span>{user.rank}. {user.name}</span>
              <span>{user.balance}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {taskData
            .filter(task => task.type === mode) // Filter tasks based on the current mode
            .map((task, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">{task.name}</h2>
                <p>{task.instructions}</p>
                <a href={task.link} className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Go
                </a>
              </div>
            ))}
        </div>
      )}

      <div className="py-5"></div>
    </div>
  );
}

export default Earn;
