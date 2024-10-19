import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Task from '../components/TaskCompo';
import Refer from '../components/ReferCompo';
import Lottery from '../components/LotteryCompo';
import Rank from '../components/RankCompo'; 
import MyContext from '../Contex/MyContext';

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Earn() {
  const [mode, setMode] = useState('Task');
  const [ticketNumber, setTicketNumber] = useState(null);
  const [hasTicket, setHasTicket] = useState(false); // State to check if user has a ticket
  const [timeLeft, setTimeLeft] = useState(720); // Set to 720 seconds (12 minutes)
  const [referralCode, setReferralCode] = useState('');
  const [loadingTaskIndex, setLoadingTaskIndex] = useState(null);
  const [submittedKeywords, setSubmittedKeywords] = useState({});
  const [taskData, setTaskData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [referralData, setReferralData] = useState([]); // State for referral data
  const [loadingReferral, setLoadingReferral] = useState(false); // Loading state for referrals

  const { appUser, setAppUser } = useContext(MyContext);

  console.log(appUser);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setReferralCode(user.referCode); // Set referral code from user
      fetchReferralData(user.referCode); // Fetch referral data
      checkUserTicket(user._id); // Check if the user has a ticket
    }
  }, []);

  const fetchReferralData = async (referCode) => {
    setLoadingReferral(true); // Set loading state
    try {
      const response = await axios.get(`${serverUrl}/referrel/by-refercode/${referCode}`);
      setReferralData(response.data.referrals || []); // Update referral data state
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoadingReferral(false); // Clear loading state
    }
  };

  // New function to check if the user has a ticket
  const checkUserTicket = async (userId) => {
    try {
      const response = await axios.get(`${serverUrl}/lottery/check-ticket/${userId}`);
      if (response.data.hasTicket) {
        setHasTicket(true);
        setTicketNumber(response.data.ticketNumber);
      } else {
        setHasTicket(false);
      }
    } catch (error) {
      console.error('Error checking ticket:', error);
    }
  };

  const handleModeChange = (newMode) => setMode(newMode);

  const handleBuyTicket = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    try {
      // Call the server to buy a ticket
      const response = await axios.post(`${serverUrl}/lottery/buy`, {
        userId: appUser._id, // Assuming you have user ID stored in appUser
      });
      setTicketNumber(response.data.ticketNumber);
      setHasTicket(true); // Set hasTicket to true after buying the ticket
    } catch (error) {
      console.error('Error buying ticket:', error);
      alert('An error occurred while trying to buy a ticket. Please try again later.');
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied to clipboard!');
  };

  const handleGoClick = (link, index) => {
    window.open(link, '_blank');
    setLoadingTaskIndex(index);
  };

  const handleKeywordSubmit = (event, taskKeyword, index, point) => {
    event.preventDefault();
    const keywordInput = event.target.elements.keyword.value;

    if (keywordInput === taskKeyword) {
      setSubmittedKeywords((prev) => ({ ...prev, [index]: 'Complete' }));
      setLoadingTaskIndex(null);
      
      // Update the user's balance
      let localUser = JSON.parse(localStorage.getItem('user'));
      localUser.Balance += point; 
      localStorage.setItem('user', JSON.stringify(localUser)); // Save updated user to localStorage

      // Update appUser state
      setAppUser((prev) => ({
        ...prev,
        Balance: localUser.Balance, // Update balance
      }));
    } else {
      alert('Keyword does not match. Please try again.');
      event.target.reset();
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${serverUrl}/task`);
        setTaskData(response.data); // Adjust based on API response structure
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchUserRanking = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user/all-user/rank`);
        setUserData(response.data.allUsers); 
      } catch (error) {
        console.error('Error fetching user ranking:', error);
      }
    };

    if (mode === 'User Rank') {
      fetchUserRanking();
    }
  }, [mode]);

  const formatTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Ways to Earn Cryptocurrency</h1>
      <p className="mb-4">Discover various methods to earn cryptocurrency and maximize your profits!</p>

      <div className="flex space-x-4 mb-6">
        <button onClick={() => handleModeChange('Task')} className={`px-4 py-2 rounded ${mode === 'Task' ? 'bg-blue-600' : 'bg-gray-700'}`}>Task</button>
        <button onClick={() => handleModeChange('Refer')} className={`px-4 py-2 rounded ${mode === 'Refer' ? 'bg-blue-600' : 'bg-gray-700'}`}>Refer</button>
        <button onClick={() => handleModeChange('User Rank')} className={`px-4 py-2 rounded ${mode === 'User Rank' ? 'bg-blue-600' : 'bg-gray-700'}`}>Rank</button>
        <button onClick={() => handleModeChange('Lottery')} className={`px-4 py-2 rounded ${mode === 'Lottery' ? 'bg-blue-600' : 'bg-gray-700'}`}>Lottery</button>
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
          referralData={referralData} // Pass the fetched referral data
          copyReferralCode={copyReferralCode}
          loading={loadingReferral} // Pass loading state for referral data
        />
      )}
      {mode === 'User Rank' && <Rank userData={userData} currentUserId={appUser.UserId} />}
      {mode === 'Lottery' && (
        <Lottery
          ticketNumber={hasTicket ? ticketNumber : null} // Pass ticket number if user has one
          handleBuyTicket={!hasTicket ? handleBuyTicket : null} // Only allow to buy ticket if user doesn't have one
          formatTimeLeft={formatTimeLeft}
          timeLeft={timeLeft}
        />
      )}
    </div>
  );
}

export default Earn;
