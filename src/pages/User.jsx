// src/components/Loader.jsx
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateUserOnServer } from '../HalperFuntion/UserUpdate';


const Loader = () => {
    const { id } = useParams(); // Destructure id from the params
    const navigate = useNavigate();

    const databaseCall = sessionStorage.getItem("dbcall");

 const localNumber =     localStorage.getItem('limitNumber');

    

    if (!databaseCall) {
      UpdateUserOnServer();
      sessionStorage.setItem('dbcall', 'dadabaseCalled');
    } else {
      console.log('data base already called');
    }

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/${id}`);
                console.log('NewUser:', response.data.NewUser); // Debugging log

                if (isMounted && response && response.data) {
                    // Check if NewUser exists in the response data
                    if (response.data.NewUser) {
                        localStorage.clear(); // Clear local storage first
                        localStorage.setItem('user', JSON.stringify(response.data)); // Set user data after clearing
                        localStorage.setItem('limitNumber', localNumber);
                        navigate('/new-user'); // Navigate to new user page if NewUser is defined
                    } else {
                        localStorage.clear(); // Clear local storage first
                        localStorage.setItem('user', JSON.stringify(response.data)); 
                        localStorage.setItem('limitNumber', localNumber);
                        navigate('/'); // Navigate to home page if NewUser is undefined
                    }
                }
            } catch (error) {
                console.error("Error fetching user:", error); // Handle the error
                // Optionally, you can navigate to an error page or show a notification
            }
        };

        fetchUser(); // Call the async function

        return () => {
            isMounted = false; // Cleanup function to prevent state updates after unmount
        };
    }, [id, navigate]); // Add id and navigate to the dependency array

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
