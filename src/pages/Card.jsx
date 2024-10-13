// src/pages/Card.jsx
import React from 'react';

const Card = () => {
  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Crypto Card</h2>
      <p className="mb-4">
        Your Crypto Card allows you to spend your cryptocurrencies easily and conveniently. You can load your card with various cryptocurrencies and use it at millions of merchants worldwide.
      </p>
      
      <h3 className="text-xl font-semibold mb-2">Features:</h3>
      <ul className="list-disc list-inside">
        <li className="mb-2">🔒 Secure transactions with multi-signature authentication.</li>
        <li className="mb-2">💳 Load your card with Bitcoin, Ethereum, and more.</li>
        <li>🌍 Use at any merchant that accepts standard debit cards.</li>
      </ul>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Get Started:</h3>
      <p>
        To order your Crypto Card, please follow these steps:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li>Sign up for an account.</li>
        <li>Verify your identity.</li>
        <li>Order your card and wait for delivery!</li>
      </ol>

      <p className="mt-4">
        For any questions or support, feel free to contact our support team.
      </p>
    </div>
  );
};

export default Card;
