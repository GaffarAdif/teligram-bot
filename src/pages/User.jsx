// src/components/Loader.jsx
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Loader = () => {
    const { id } = useParams(); // Destructure id from the params
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/${id}`);
                if (response && response.data) {
                    localStorage.setItem('user', id); 
                    console.log(response.data.id);
                }
            } catch (error) {
                console.error("Error fetching user:", error); // Handle the error
            }
        };

        fetchUser(); // Call the async function
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
