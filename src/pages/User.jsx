import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateUserOnServer } from '../HalperFuntion/UserUpdate';

const Loader = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const databaseCall = sessionStorage.getItem("dbcall");
    const localNumber = localStorage.getItem('limitNumber');

    // Initialize Telegram WebApp
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe.user; // Get user data from Telegram WebApp

    if (!databaseCall) {
      UpdateUserOnServer();
      sessionStorage.setItem('dbcall', 'dadabaseCalled');
    } else {
      console.log('data base already called');
    }

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            try {
                // Add Telegram user info to the request
                const response = await axios.get(`http://localhost:3000/user/${id}`, {
                    TeligramUser: {
                        telegramUserId: user.id, // Pass Telegram user ID
                        username: user.username,
                        firstName: user.first_name,
                        lastName: user.last_name
                    }
                });

                console.log('NewUser:', response.data.NewUser);

                if (isMounted && response && response.data) {
                    if (response.data.NewUser) {
                        localStorage.clear(); 
                        localStorage.setItem('user', JSON.stringify(response.data)); 
                        localStorage.setItem('limitNumber', localNumber);
                        navigate('/new-user');
                    } else {
                        localStorage.clear(); 
                        localStorage.setItem('user', JSON.stringify(response.data)); 
                        localStorage.setItem('limitNumber', localNumber);
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();

        return () => {
            isMounted = false;
        };
    }, [id, navigate, user.id, user.username, user.first_name, user.last_name]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
                <p className="mt-4 text-white text-lg">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
