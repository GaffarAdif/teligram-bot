// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTelegram } from 'react-icons/fa';
import { GiReceiveMoney, GiCardPlay } from 'react-icons/gi';

function Header() {
  return (
    <>

      <nav className="p-2 fixed bg-black bottom-0 left-0 right-0 flex justify-around text-white shadow-md z-10">
        <NavLink
          to="/"
          className={({ isActive }) => 
            `flex flex-col items-center ${isActive ? 'text-blue-400' : ''}`
          }
        >
          <GiCardPlay className="text-2xl" />
          <span className="text-sm">Collect</span>
        </NavLink>
        <NavLink
          to="/earn"
          className={({ isActive }) => 
            `flex flex-col items-center ${isActive ? 'text-blue-400' : ''}`
          }
        >
          <GiReceiveMoney className="text-2xl" />
          <span className="text-sm">Earn</span>
        </NavLink>
        <NavLink
          to="/airdrop"
          className={({ isActive }) => 
            `flex flex-col items-center ${isActive ? 'text-blue-400' : ''}`
          }
        >
          <FaTelegram className="text-2xl" />
          <span className="text-sm">Airdrop</span>
        </NavLink>
      </nav>
      <FaTelegram className="text-2xl fixed bottom-16 right-4 text-blue-500 cursor-pointer z-10" />
    </>
  );
}

export default Header;
