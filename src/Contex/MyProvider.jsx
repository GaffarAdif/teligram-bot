import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
    const [appUser, setAppUser] = useState(() => {
        // Initialize the appUser state from local storage if available
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Update local storage whenever appUser changes
    useEffect(() => {
        if (appUser) {
            localStorage.setItem('user', JSON.stringify(appUser));
        }
    }, [appUser]);

    return (
        <MyContext.Provider value={{ appUser, setAppUser }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
