import React, { useState, useEffect, useRef } from 'react';
import AdminHeader from '../Components/AdminHeader'; // Adjust the path as necessary
import Sidebar from '../Components/Sidebar'; // Adjust the path as necessary
import Dashboard from './AdminDashboard'; // Import the Dashboard component

const AdminHomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open
  const sidebarRef = useRef(null);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Close sidebar if clicked outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && sidebarOpen) {
      console.log('Clicked outside, closing sidebar');
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed z-30 inset-y-0 left-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full' // Fully off-screen
        }`}
        style={{ width: '250px' }} // Set the sidebar width to 250px
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`} // Adjust margin-left based on sidebar state
      >
        {/* Header */}
        <AdminHeader toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Include the Dashboard component */}
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default AdminHomePage;
