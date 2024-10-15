import React, { useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa'; // Copy Icon

// Sample task data
const taskData = [
  {
    type: 'Task',
    name: 'Mining',
    instructions: 'Participate in our mining pool and earn rewards by contributing your computational power.',
    link: 'https://example.com/mining', // Replace with actual link
    points: 10, // Points for completing this task
    keyword: 'mining-keyword', // Task keyword for verification
  },
  {
    type: 'Task',
    name: 'Staking',
    instructions: 'Lock your assets in our staking program to earn passive income on your holdings.',
    link: 'https://example.com/staking', // Replace with actual link
    points: 15, // Points for completing this task
    keyword: 'staking-keyword', // Task keyword for verification
  },
  {
    type: 'Refer',
    name: 'Referral Program',
    instructions: 'Join our referral program and earn rewards for bringing new users to the platform!',
    link: 'https://example.com/refer', // Replace with actual link
    points: 20, // Points for completing this task
  },
];

// Sample user data with rank numbers
const userData = [
  { rank: 1, name: 'Alice', balance: '3.0 ETH' },
  { rank: 2, name: 'Bob', balance: '2.5 ETH' },
  { rank: 3, name: 'Charlie', balance: '1.0 ETH' },
];

// Demo referral data
const demoReferralData = [
  { name: 'John Doe', date: '2023-10-01' },
  { name: 'Jane Smith', date: '2023-10-03' },
  { name: 'Sam Wilson', date: '2023-10-05' },
];

function Earn() {
  const [mode, setMode] = useState('Task');
  const [ticketNumber, setTicketNumber] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour initially
  const [referralCode, setReferralCode] = useState('QT-123-456');
  const [loadingTaskIndex, setLoadingTaskIndex] = useState(null);
  const [submittedKeywords, setSubmittedKeywords] = useState({});

  const handleModeChange = (newMode) => setMode(newMode);

  const handleBuyTicket = () => {
    const newTicketNumber = `QT${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(newTicketNumber);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied to clipboard!');
  };

  const handleGoClick = (link, index) => {
    // Open the link in a new tab
    window.open(link, '_blank');

    // Start loading state for the specific task
    setLoadingTaskIndex(index);
  };

  const handleKeywordSubmit = (event, taskKeyword, index) => {
    event.preventDefault();
    const keywordInput = event.target.elements.keyword.value;
    if (keywordInput === taskKeyword) {
      setSubmittedKeywords((prev) => ({ ...prev, [index]: 'Complete' }));
      setLoadingTaskIndex(null); // Stop loading when keyword matches
    } else {
      alert('Keyword does not match. Please try again.');
      event.target.reset(); // Clear the input if the keyword doesn't match
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTimeLeft = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Ways to Earn Cryptocurrency</h1>
      <p className="mb-4">Discover various methods to earn cryptocurrency and maximize your profits!</p>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleModeChange('Task')}
          className={`px-4 py-2 rounded ${mode === 'Task' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Task
        </button>
        <button
          onClick={() => handleModeChange('Refer')}
          className={`px-4 py-2 rounded ${mode === 'Refer' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Refer
        </button>
        <button
          onClick={() => handleModeChange('User Rank')}
          className={`px-4 py-2 rounded ${mode === 'User Rank' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Rank
        </button>
        <button
          onClick={() => handleModeChange('Lottery')}
          className={`px-4 py-2 rounded ${mode === 'Lottery' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Lottery
        </button>
      </div>

      {mode === 'Refer' ? (
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
            <p className="mt-4">You've referred {demoReferralData.length} users so far. Keep going to unlock more rewards!</p>
          </div>

          <h3 className="text-xl font-semibold mt-6">Referred Users</h3>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            {demoReferralData.map((user, index) => (
              <div key={index} className="flex justify-between border-b border-gray-600 py-2">
                <span>{user.name}</span>
                <span>{user.date}</span>
              </div>
            ))}
          </div>
        </div>
      ) : mode === 'User Rank' ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">User Rankings</h2>
          {userData.map((user, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between">
              <span>{user.rank}. {user.name}</span>
              <span>{user.balance}</span>
            </div>
          ))}
        </div>
      ) : mode === 'Lottery' ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Lottery</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            {ticketNumber ? (
              <>
                <h3 className="text-xl font-semibold">Your Ticket Number</h3>
                <p className="text-3xl font-bold text-green-500 mt-2">{ticketNumber}</p>
                <p className="mt-4">Time left until draw: <span className="font-bold text-yellow-400">{formatTimeLeft(timeLeft)}</span></p>
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
                <p className="mt-4">Time left until draw: <span className="font-bold text-yellow-400">{formatTimeLeft(timeLeft)}</span></p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Available Tasks</h2>
          {taskData.map((task, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div>
                <h2 className="text-xl font-semibold">{task.name}</h2>
                <p className="mt-2">{task.instructions}</p>
                <p className="mt-2 font-bold">Earn: {task.points} points</p>
              </div>

              {loadingTaskIndex === index && (
                <form onSubmit={(e) => handleKeywordSubmit(e, task.keyword, index)} className="mt-4">
                  <input
                    type="text"
                    name="keyword"
                    placeholder="Enter task keyword"
                    className="px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg w-full"
                    required
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                  >
                    Submit
                  </button>
                </form>
              )}

              {!submittedKeywords[index] && loadingTaskIndex !== index && (
                <button
                  onClick={() => handleGoClick(task.link, index)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                  {loadingTaskIndex === index ? 'Loading...' : 'Go'}
                </button>
              )}

              {submittedKeywords[index] && (
                <p className="mt-2 text-green-400 font-bold">{submittedKeywords[index]}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Earn;
