import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MyContext from '../Contex/MyContext';
const serverUrl = import.meta.env.VITE_SERVER_URL;
function Lottery({ ticketNumber, handleBuyTicket, curUser }) {
  const [winnerData, setWinnerData] = useState([]); // State to store winner data
  const [isWinner, setIsWinner] = useState(false); // State to track if the user is a winner
  const [canCollect, setCanCollect] = useState(true); // State to control if reward can be collected
  const [loading, setLoading] = useState(true); // Loading state for fetching winners

  const { setAppUser } = useContext(MyContext);

  // Allowed times to collect the reward
  const allowedTimes = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];

  // Check if the reward collection is allowed based on time
  const checkRewardPermission = () => {
    const lastCollected = localStorage.getItem('lastCollected');
    if (lastCollected) {
      const lastCollectedTime = new Date(lastCollected);
      const now = new Date();

      // Find the next allowed time after last collection
      const nextAllowedTime = getNextAllowedTime(lastCollectedTime, now);

      // Enable the button if it's past the next allowed time
      setCanCollect(now >= nextAllowedTime);
    } else {
      setCanCollect(true); // No previous collection found, allow to collect
    }
  };

  // Function to get the next allowed time after last collection
  const getNextAllowedTime = (lastCollectedTime, now) => {
    for (const time of allowedTimes) {
      const [hours, minutes] = time.split(':').map(Number);
      const nextAllowedDate = new Date(now);
      nextAllowedDate.setHours(hours, minutes, 0, 0);

      if (nextAllowedDate > now) {
        return nextAllowedDate; // Return next allowed time
      }
    }

    // If no allowed time is left today, return the first time of tomorrow
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0); // Set to 12AM next day
    return nextDay;
  };

  useEffect(() => {
    const fetchWinners = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(`${serverUrl}/lottery/winners`,); // Replace with your API endpoint
        setWinnerData(response.data[0].winners);

        const winnerFound = response.data[0].winners.some(winner => winner.userId === curUser);
        setIsWinner(winnerFound);

        // Check if the reward can be collected based on last collection time
        checkRewardPermission();
      } catch (error) {
        console.error('Error fetching winners:', error);
        alert('Failed to fetch winner data. Please try again later.'); // Error handling
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchWinners(); // Call the fetch function when the component mounts
  }, [curUser]);

  // Handle reward collection
  const handleCollectReward = () => {
    const now = new Date();
    localStorage.setItem('lastCollected', now); // Store the current time in localStorage
    setCanCollect(false); // Disable the button for now
    alert('Reward collected!'); // Replace with actual reward collection logic

    // Update the user's balance
    let localUser = JSON.parse(localStorage.getItem('user'));
    localUser.Balance += 200; 
    localStorage.setItem('user', JSON.stringify(localUser)); // Save updated user to localStorage

    // Update appUser state
    setAppUser(prev => ({
      ...prev,
      Balance: localUser.Balance, // Update balance
    }));
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Lottery</h2>
      {loading ? ( // Show loading indicator while fetching data
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex flex-col items-center">
          {ticketNumber ? (
            <div className="text-lg mb-4 p-2 bg-green-600 rounded shadow-lg">
              Your Ticket Number: <span className="font-bold">{ticketNumber}</span>
            </div>
          ) : (
            <div>
              <p className="text-lg mb-4">You do not have a ticket yet.</p>
              <button
                onClick={handleBuyTicket}
                className="px-6 py-3 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-600"
              >
                Buy Ticket
              </button>
            </div>
          )}

          {/* Display the winning message if the user is a  winner  */}
          {isWinner && (
            <div className="mt-4 p-4 bg-yellow-500 rounded-lg shadow-lg text-center">
              <p className="text-xl font-bold mb-4">Congratulations! You're a winner!</p>
              <button
                className={`px-6 py-3 rounded transition duration-300 ${
                  canCollect ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 cursor-not-allowed'
                } text-white`}
                onClick={handleCollectReward}
                disabled={!canCollect} // Disable the button if the reward has been collected recently
              >
                {canCollect ? 'Collect Reward' : 'Already Collected, Try Later'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Lottery;
