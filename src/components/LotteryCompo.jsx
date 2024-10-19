import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Lottery({ ticketNumber, handleBuyTicket, curUser }) {
  const [winnerData, setWinnerData] = useState([]); // State to store winner data
  const [isWinner, setIsWinner] = useState(false);  // State to track if the user is a winner

  useEffect(() => {
    // Function to fetch ticket data from the server
    const fetchWinners = async () => {
      try {
        const response = await axios.get('http://localhost:3000/lottery/winners'); // Replace with your API endpoint

        // Set the fetched winner data to the state
        setWinnerData(response.data[0].winners);

        // Check if curUser is in the list of winners and update isWinner state
        const winnerFound = response.data[0].winners.some(winner => winner.userId === curUser);
        setIsWinner(winnerFound);

      } catch (error) {
        console.error('Error fetching winners:', error);
      }
    };

    fetchWinners(); // Call the fetch function when the component mounts

  }, [curUser]); // Re-run if curUser changes

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Lottery</h2>
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

        {/* Display the winning message if the user is a winner regardless of having a ticket */}
        {isWinner && (
          <div className="mt-4 p-4 bg-yellow-500 rounded-lg shadow-lg text-center">
            <p className="text-xl font-bold mb-4">Congratulations! You're a winner!</p>
            <button
              className="px-6 py-3 bg-red-500 text-white rounded transition duration-300 hover:bg-red-600"
              onClick={() => alert('Reward collected!')} // Replace with actual reward collection logic
            >
              Collect Reward
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lottery;
