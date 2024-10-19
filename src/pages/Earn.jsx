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
  const [hasTicket, setHasTicket] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [loadingTaskIndex, setLoadingTaskIndex] = useState(null);
  const [submittedKeywords, setSubmittedKeywords] = useState({});
  const [taskData, setTaskData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [referralData, setReferralData] = useState([]);
  const [loadingReferral, setLoadingReferral] = useState(false);

  const { appUser, setAppUser } = useContext(MyContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setReferralCode(user.referCode);
      fetchReferralData(user.referCode);
      checkUserTicket(user._id);
    }
  }, []);

  const fetchReferralData = async (referCode) => {
    setLoadingReferral(true);
    try {
      const response = await axios.get(`${serverUrl}/referrel/by-refercode/${referCode}`);
      setReferralData(response.data.referrals || []);
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoadingReferral(false);
    }
  };

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
      const response = await axios.post(`${serverUrl}/lottery/buy`, {
        userId: appUser._id,
      });
      setTicketNumber(response.data.ticketNumber);
      setHasTicket(true);
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

  const handleKeywordSubmit = (event, taskKeyword, index, point, taskId) => {
    event.preventDefault();
    const keywordInput = event.target.elements.keyword.value;
  
    if (keywordInput === taskKeyword) {
      setSubmittedKeywords((prev) => ({ ...prev, [index]: 'Complete' }));
      setLoadingTaskIndex(null);
  
      let localUser = JSON.parse(localStorage.getItem('user'));
      if (!localUser) {
        alert('User not found. Please log in again.');
        return;
      }
  
      localUser.Balance = localUser.Balance || 0; 
      localUser.TaskCompleteId = localUser.TaskCompleteId || [];
  
      localUser.Balance += point;
      localUser.TaskCompleteId = [...localUser.TaskCompleteId, taskId];
      localStorage.setItem('user', JSON.stringify(localUser));
  
      setAppUser((prev) => ({
        ...prev,
        Balance: localUser.Balance,
        TaskCompleteId: localUser.TaskCompleteId
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
        setTaskData(response.data); 
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

  // ** NEW: Filter tasks based on completed tasks in local storage **
  const filterCompletedTasks = (tasks) => {
    const localData = JSON.parse(localStorage.getItem('user')) || [];

    const completedTaskIds = localData.TaskCompleteId
    return tasks.filter(task => !completedTaskIds.includes(task._id)); // Adjust the property based on your task structure
  };

  const filteredTaskData = filterCompletedTasks(taskData); // Get the filtered tasks

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
          taskData={filteredTaskData} // Pass the filtered task data
          handleGoClick={handleGoClick}
          handleKeywordSubmit={handleKeywordSubmit}
          loadingTaskIndex={loadingTaskIndex}
          submittedKeywords={submittedKeywords}
        />
      )}
      {mode === 'Refer' && (
        <Refer
          referralCode={referralCode}
          referralData={referralData}
          copyReferralCode={copyReferralCode}
          loading={loadingReferral}
        />
      )}
      {mode === 'User Rank' && <Rank userData={userData} currentUserId={appUser.UserId} />}
      {mode === 'Lottery' && (
        <Lottery
          ticketNumber={hasTicket ? ticketNumber : null}
          handleBuyTicket={!hasTicket ? handleBuyTicket : null}
          curUser={appUser._id}
        />
      )}
    </div>
  );
}

export default Earn;
