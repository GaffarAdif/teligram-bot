// src/pages/Home.jsx
import React from 'react';
import MiningStatus from '../components/MiningStatus';

function Home() {
  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Crypto Mining App!</h1>
      <p className="mb-4">
        Stay updated with your mining status and manage your crypto assets seamlessly.
      </p>

      <MiningStatus />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>✅ Real-time mining statistics</li>
          <li>✅ User-friendly interface</li>
          <li>✅ Secure transactions</li>
          <li>✅ 24/7 customer support</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Get Started Today!</h2>
        <p>
          Sign up now to start your journey in the world of cryptocurrency mining!
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;
