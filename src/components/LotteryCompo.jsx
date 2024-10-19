import React from 'react';

function Lottery({ ticketNumber, handleBuyTicket, formatTimeLeft, timeLeft }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Lottery</h2>
      <div className="flex flex-col items-center">
        {ticketNumber ? (
          <div className="text-lg mb-4 p-2 bg-green-600 rounded shadow-lg">Your Ticket Number: <span className="font-bold">{ticketNumber}</span></div>
        ) : (
          <button
            onClick={handleBuyTicket}
            className="px-6 py-3 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-600"
          >
            Buy Ticket
          </button>
        )}
        <div className="mt-4 text-lg">Time Left: <span className="font-bold">{formatTimeLeft(timeLeft)}</span></div>
      </div>
    </div>
  );
}

export default Lottery;
