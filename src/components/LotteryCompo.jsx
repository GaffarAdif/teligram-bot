import React from 'react';

function Lottery({ ticketNumber, handleBuyTicket, formatTimeLeft, timeLeft }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Lottery</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
        {ticketNumber ? (
          <>
            <h3 className="text-xl font-semibold">Your Ticket Number</h3>
            <p className="text-3xl font-bold text-green-500 mt-2">{ticketNumber}</p>
            <p className="mt-4">
              Time left until draw: <span className="font-bold text-yellow-400">{formatTimeLeft(timeLeft)}</span>
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-4">Buy a Lottery Ticket</h3>
            <button
              onClick={handleBuyTicket}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Buy Ticket
            </button>
            <p className="mt-4">
              Time left until draw: <span className="font-bold text-yellow-400">{formatTimeLeft(timeLeft)}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Lottery;
