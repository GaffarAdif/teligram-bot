import React from 'react';
import { FaBars } from 'react-icons/fa'; // Importing the hamburger icon

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between h-16 bg-gray-800 text-white px-4">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded focus:outline-none hover:bg-gray-700"
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-xl font-bold ml-4">Admin Dashboard</h1>
      </div>
      <div className="flex items-center">
      </div>
    </header>
  );
};

export default AdminHeader;
