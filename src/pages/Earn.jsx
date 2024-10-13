// src/pages/Earn.jsx
import React from 'react';

function Earn() {
  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Ways to Earn Cryptocurrency</h1>
      <p className="mb-4">
        Discover various methods to earn cryptocurrency and maximize your profits!
      </p>

      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">1. Mining</h2>
          <p>
            Participate in our mining pool and earn rewards by contributing your computational power.
          </p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Learn More
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">2. Staking</h2>
          <p>
            Lock your assets in our staking program to earn passive income on your holdings.
          </p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Learn More
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">3. Affiliate Program</h2>
          <p>
            Refer friends to our platform and earn commissions on their mining activities.
          </p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Earn;
