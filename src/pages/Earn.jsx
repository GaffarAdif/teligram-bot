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

function Earn() {
  // State to track the current mode (Task or Refer)
  const [mode, setMode] = useState('Task');

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Ways to Earn Cryptocurrency</h1>
      <p className="mb-4">
        Discover various methods to earn cryptocurrency and maximize your profits!
      </p>

      {/* Button to switch between Task and Refer modes */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setMode('Task')}
          className={`px-4 py-2 rounded ${mode === 'Task' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Task
        </button>
        <button
          onClick={() => setMode('Refer')}
          className={`px-4 py-2 rounded ${mode === 'Refer' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Refer
        </button>
      </div>

      {/* Conditional rendering based on the selected mode */}
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
    </div>
  );
}

export default Earn;
