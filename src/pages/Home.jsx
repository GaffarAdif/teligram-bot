// src/pages/Home.jsx
import React from 'react';
import ProfileInfo from '../components/Profile-info';
import TapSwapGame from '../components/TapGame';

function Home() {
  const user = {
    avatarUrl: 'https://example.com/avatar.jpg', // Replace with the user's avatar URL
    name: 'John Doe',
    balance: 100.00,
  };

  // Sample notices
  const notices = [
    'Notice 1: Your account balance has been updated.',
    'Notice 2: New features are coming soon!',
    'Notice 3: Don’t forget to check out the latest offers!',
  ];

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <ProfileInfo 
        avatarUrl={user.avatarUrl} 
        name={user.name} 
        balance={user.balance} 
      />

      <div className="mt-4">
        <h2 className="text-lg font-bold">Notice</h2>
        <ul className="list-disc pl-5">
          {notices.map((notice, index) => (
            <li key={index} className="mt-2">{notice}</li>
          ))}
        </ul>
      </div>

      <TapSwapGame />

      
    </div>
  );
}

export default Home;
