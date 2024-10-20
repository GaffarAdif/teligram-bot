import React, { useContext, useEffect, useState } from 'react';
import ProfileInfo from '../components/Profile-info';
import TapSwapGame from '../components/TapGame';
import MyContext from '../Contex/MyContext';
import axios from 'axios';

function Home() {
  // Access the environment variable
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const { appUser, setAppUser } = useContext(MyContext);
  const [error, setError] = useState(null);
  const [notices, setNotices] = useState([]); // State to store notices
  const [loading, setLoading] = useState(true); // State for loading



  // Fetch notices from server
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${serverUrl}/notice`); // Make sure the endpoint is correct
        setNotices(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load notices');
        setLoading(false);
      }
    };

    fetchNotices();
  }, [serverUrl]);

  // If user data is missing, show an error
  if (error) {
    return (
      <div className="container mx-auto p-4 bg-black text-white min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-bold">{error}</h2>
      </div>
    );
  }

  // Show a loading spinner while fetching data
  if (loading) {
    return (
      <div className="container mx-auto p-4 bg-black text-white min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-bold">Loading...</h2>
      </div>
    );
  }

  // If user data is available, render the main content
  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <ProfileInfo 
        avatarUrl={'https://res.cloudinary.com/dijeptfb6/image/upload/v1728886046/lyboq02a3m5db4ulgxsl.webp'} 
        name={appUser?.name || 'John Doe'} 
        balance={appUser?.Balance} 
      />

      <div className="mt-4">
        <h2 className="text-lg font-bold">Notice</h2>
        <ul className="list-disc pl-5">
          {notices.map((notice, index) => (
            <li key={index} className="mt-2">{notice.notice}</li>
          ))}
        </ul>

        <div className="py-2"></div>
      </div>

      <TapSwapGame />
      <div className="py-4"></div>
    </div>
  );
}

export default Home;
