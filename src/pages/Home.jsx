import React, { useEffect, useState } from 'react';
import ProfileInfo from '../components/Profile-info';
import TapSwapGame from '../components/TapGame';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Home() {
  // Access the environment variable
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    
    if (storedUserData) {
      setUser(JSON.parse(storedUserData)); // Parse the stored user data
    } else {
      setError('No user data found. Please log in.');
    }
  }, []);

  // Sample notices
  const notices = [
    'Notice 1: Your account balance has been updated.',
    'Notice 2: New features are coming soon!',
    'Notice 3: Don’t forget to check out the latest offers!',
  ];

  // If user data is missing, show an error
  if (error) {
    return (
      <div className="container mx-auto p-4 bg-black text-white min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-bold">{error}</h2>
      </div>
    );
  }

  // If user data is available, render the main content
  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <ProfileInfo 
        avatarUrl={'https://res.cloudinary.com/dijeptfb6/image/upload/v1728886046/lyboq02a3m5db4ulgxsl.webp'} 
        name={user?.name || 'John Doe'} 
        balance={user?.balance || 100.00} 
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
      <div className="py-4"></div>
    </div>
  );
}

export default Home;
