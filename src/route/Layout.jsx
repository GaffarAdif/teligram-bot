// src/pages/Layout.jsx
import React from 'react';
import Header from '../components/Header';

import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This is where nested routes will render */}
      </main>
    </div>
  );
}

export default Layout;
