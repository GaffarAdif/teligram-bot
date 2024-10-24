import React, { useState } from 'react';

const Airdrop = () => {

  const roadmapData = [
    {
      season: 'Season 1',
      reward: '10K QTM = 1$',
      users: '5 Million Users',
    },
    {
      season: 'Season 2',
      reward: '10K QTM = 1.5$',
      users: '15 Million Users',
    },
    {
      season: 'Final Season',
      reward: '10K QTM = 1000 Exchanger QTM Coin',
      users: '30 Million Users',
      note: 'Listing in Exchanger',
    },
  ];

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Airdrop Opportunities</h2>
      <p className="mb-4">
        Stay tuned for the latest airdrop events! Participate to earn free tokens by completing simple tasks.
      </p>
      
      <h3 className="text-xl font-semibold mb-4">Roadmap:</h3>
      <div className="flex flex-col">
        {roadmapData.map((item, index) => (
          <div
            key={index}
            className="relative mb-8 p-4 bg-gray-800 rounded-lg"
          >
            <div className="absolute left-0 top-4 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="ml-6">
              <h4 className="text-lg font-bold">{item.season}</h4>
              <p>
                <strong>Reward:</strong> {item.reward}
              </p>
              <p>
                <strong>Users Required:</strong> {item.users}
              </p>
              {item.note && (
                <p>
                  <strong>Note:</strong> {item.note}
                </p>
              )}
            </div>
            {index < roadmapData.length - 1 && (
              <div className="absolute left-1.5 top-12 border-l-2 border-gray-500 h-24"></div>
            )}
          </div>
        ))}
      </div>


      <p className="mt-4">
        <strong>Note:</strong> Check our Announcement Channel regularly for updates on new airdrop campaigns!
      </p>
    </div>
  );
};

export default Airdrop;
