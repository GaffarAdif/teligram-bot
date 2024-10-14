import React, { useEffect } from 'react';
import ProfileInfo from '../components/Profile-info';
import TapSwapGame from '../components/TapGame';
import axios from 'axios';

function Home() {
  // Access the environment variable
  const serverUrl = import.meta.env.VITE_SERVER_URL;


  console.log('Server URL:', serverUrl); // Logs the server URL


  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/`); // Ensure this endpoint is correct
        console.log('Server url  : ', response.data);
      } catch (err) {
        console.error('Error fetching user data:', err); // Log the error
      } 
    };

    fetchUserData()
  
  },[])






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
        avatarUrl={'https://res.cloudinary.com/dijeptfb6/image/upload/v1728886046/lyboq02a3m5db4ulgxsl.webp'} 
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
      <div className="py-4"></div>
    </div>
  );
}

export default Home;
