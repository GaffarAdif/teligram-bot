import React, { useState } from 'react';
import { ethers } from 'ethers';

const Airdrop = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const roadmapData = [
    {
      season: 'Season 1',
      reward: '10K  QTM = 1$',
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

  const handleConnectWallet = async () => {
    // Check if the browser has an Ethereum provider (MetaMask)
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Request account access if needed
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        alert(`Connected: ${address}`);
      } catch (error) {
        console.error(error);
        alert('Failed to connect to wallet');
      }
    } else {
      alert('No wallet found! Please install MetaMask or ToonKeeper.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      {/* Wallet Connection Button */}
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-900 rounded-lg">
        <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
        <button
          onClick={handleConnectWallet}
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500"
        >
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
        </button>
      </div>

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
        <strong>Note:</strong> check our Announcement Channel regularly for updates on new airdrop campaigns!
      </p>
    </div>
  );
};

export default Airdrop;
