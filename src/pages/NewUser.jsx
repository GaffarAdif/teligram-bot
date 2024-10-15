// WelcomeUser.js
import React, { useState } from 'react';
import { useParams, useNavigate, json } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios

const WelcomeUser = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const user = JSON.parse(localStorage.getItem('user'))

    console.log('this is user ',user);

    const navigate = useNavigate(); // Using useNavigate instead of useHistory
    const [step, setStep] = useState(1); // State to track the current step
    const [fullName, setFullName] = useState(''); // State to store the full name input

    const handleNext = async () => {
        if (step === 3) {
            try {
                // Call the API to update the user's status
                await axios.put(`${serverUrl}/user/update-Status/${user.UserId}`);
                // Redirect to the home page
                navigate('/');
            } catch (error) {
                console.error('Error updating user status:', error);
                // Optionally, handle the error (e.g., show a notification)
            }
        } else {
            // Move to the next step
            setStep(prevStep => prevStep + 1);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Quantum Coin</h1>
            {step === 1 && (
                <p className="text-lg">Hello, User {user.userId}!</p>
            )}
            {step === 2 && (
                <div>
                    <p className="text-lg">Please enter your full name:</p>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-2 p-2 rounded"
                        placeholder="Full Name"
                    />
                </div>
            )}
            {step === 3 && (
                <p className="text-lg mt-4">Start Work Now!</p>
            )}
            <button 
                onClick={handleNext} 
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
            >
                {step === 3 ? 'Start Now' : 'Next'}
            </button>
        </div>
    );
};

export default WelcomeUser;
