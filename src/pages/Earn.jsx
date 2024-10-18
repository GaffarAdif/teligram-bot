import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../components/TaskCompo';
import Refer from '../components/ReferCompo';
import Lottery from '../components/LotteryCompo';
import Rank from '../components/RankCompo';

function Earn() {
  const [mode, setMode] = useState('Task');
  const [ticketNumber, setTicketNumber] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour initially
  const [referralCode, setReferralCode] = useState('QT-123-456');
  const [loadingTaskIndex, setLoadingTaskIndex] = useState(null);
  const [submittedKeywords, setSubmittedKeywords] = useState({});
  const [taskData, setTaskData] = useState([]);
  const userData = [
    { rank: 1, name: 'Alice', balance: '3.0 ETH' },
    { rank: 2, name: 'Bob', balance: '2.5 ETH' },
    { rank: 3, name: 'Charlie', balance: '1.0 ETH' },
  ];
  const demoReferralData = [
    { name: 'John Doe', date: '2023-10-01' },
    { name: 'Jane Smith', date: '2023-10-03' },
    { name: 'Sam Wilson', date: '2023-10-05' },
  ];

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
    window.open(link, '_blank');
    setLoadingTaskIndex(index);
  };

  const handleKeywordSubmit = (event, taskKeyword, index) => {
    event.preventDefault();
    const keywordInput = event.target.elements.keyword.value;
    if (keywordInput === taskKeyword) {
      setSubmittedKeywords((prev) => ({ ...prev, [index]: 'Complete' }));
      setLoadingTaskIndex(null);
    } else {
      alert('Keyword does not match. Please try again.');
      event.target.reset();
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/task'); 
        setTaskData(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

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

      {mode === 'Task' && (
        <Task
          taskData={taskData}
          handleGoClick={handleGoClick}
          handleKeywordSubmit={handleKeywordSubmit}
          loadingTaskIndex={loadingTaskIndex}
          submittedKeywords={submittedKeywords}
        />
      )}
      {mode === 'Refer' && (
        <Refer
          referralCode={referralCode}
          demoReferralData={demoReferralData}
          copyReferralCode={copyReferralCode}
        />
      )}
      {mode === 'User Rank' && <Rank userData={userData} />}
      {mode === 'Lottery' && (
        <Lottery
          ticketNumber={ticketNumber}
          handleBuyTicket={handleBuyTicket}
          formatTimeLeft={formatTimeLeft}
          timeLeft={timeLeft}
        />
      )}
    </div>
  );
}

export default Earn;
