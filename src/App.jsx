import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './route/Layout';
import Loading from './components/Loading';
import WelcomeUser from './pages/NewUser';

const Home = lazy(() => import('./pages/Home'));
const Earn = lazy(() => import('./pages/Earn'));
const Airdrop = lazy(() => import('./pages/Airdrop'));
const User = lazy(() => import('./pages/User'));


function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="earn" element={<Earn />} />
            <Route path="user/:id" element={<User />} />
            <Route path="airdrop" element={<Airdrop />} />
            <Route path="new-user" element={< WelcomeUser />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
