import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import { FaHome, FaBox, FaUsers, FaTags, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  // Mapping of sidebar labels to icons
  const iconMapping = {
    Dashboard: <FaHome />,
    Task: <FaBox />,
    Lottery: <FaTags />,
    Notice: <FaUsers />,
  };

  // Array of sidebar items
  const sidebarItems = [
    { to: '/admin/home', label: 'Dashboard' },
    { to: '/admin/task', label: 'Task' },
    { to: '/admin/lottery', label: 'Lottery' },
    { to: '/admin/notice', label: 'Notice' },
  ];

  return (
    <div className="h-full w-64 bg-gray-800 text-gray-200 shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
      </div>

      <nav className="mt-10">
        <ul>
          {sidebarItems.map((item) => (
            <li className="mb-4" key={item.label}>
              <Link
                to={item.to}
                className={`flex items-center p-3 hover:bg-gray-700 rounded-lg ${
                  location.pathname === item.to ? 'bg-gray-700' : ''
                }`} // Highlight active link
                aria-label={item.label} // Accessibility improvement
              >
                {iconMapping[item.label] && <span className="mr-3">{iconMapping[item.label]}</span>}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
