// src/pages/Airdrop.jsx
import React from 'react';

const Airdrop = () => {
  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Airdrop Opportunities</h2>
      <p className="mb-4">
        Stay tuned for the latest airdrop events! Participate to earn free tokens by completing simple tasks.
      </p>
      <h3 className="text-xl font-semibold mb-2">Current Airdrops:</h3>
      <ul className="list-disc list-inside">
        <li className="mb-2">
          <strong>Project X:</strong> Earn 100 X tokens by following us on social media and joining our Telegram group.
        </li>
        <li className="mb-2">
          <strong>Crypto Y:</strong> Complete a survey and receive 50 Y tokens for your feedback.
        </li>
        <li>
          <strong>Mining Z:</strong> Refer a friend and both receive 20 Z tokens.
        </li>
      </ul>
      <p className="mt-4">
        <strong>Note:</strong> Make sure to check our website regularly for updates on new airdrop campaigns!
      </p>
    </div>
  );
};

export default Airdrop;
