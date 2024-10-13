// src/App.jsx
import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './route/Layout';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const Earn = lazy(() => import('./pages/Earn'));
const Airdrop = lazy(() => import('./pages/Airdrop'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="earn" element={<Earn />} />
            <Route path="airdrop" element={<Airdrop />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
