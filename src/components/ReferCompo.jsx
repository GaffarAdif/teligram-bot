import React from 'react';
import { FaCopy } from 'react-icons/fa';

function Refer({ referralCode, referralData, copyReferralCode }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Referral Program</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">You Must Refer 3 Friends To Be Eligible for the Airdrop</h3>
        <p>Your Referral Code:</p>
        <div className="flex items-center mt-2">
          <span className="bg-gray-900 px-4 py-2 rounded-lg text-lg">{referralCode}</span>
          <button
            onClick={copyReferralCode}
            className="ml-2 p-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            <FaCopy />
          </button>
        </div>
        <p className="mt-4">You've referred {referralData.length} users so far. Keep going to unlock more rewards!</p>
      </div>

      <h3 className="text-xl font-semibold mt-6">Referred Users</h3>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        {referralData.length > 0 ? (
          referralData.map((user, index) => (
            <div key={index} className="flex justify-between border-b border-gray-600 py-2">
              <span>{user.name}</span>
              <span>{user.date}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Your referral list is empty.</p>
        )}

        <div className="py-5"></div>
      </div>
    </div>
  );
}

export default Refer;
