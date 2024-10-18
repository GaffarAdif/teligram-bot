import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './route/Layout';
import Loading from './components/Loading';
import WelcomeUser from './pages/NewUser';
import MyProvider from './Contex/MyProvider'; // Import your provider
import AdminLogin from './Admin/Pages/login';
import AdminHomePage from './Admin/Pages/AdminHomePage';
import AdminTaskPage from './Admin/Pages/AdminTask';
import AdminNotice from './Admin/Pages/AdminNotice';


const Home = lazy(() => import('./pages/Home'));
const Earn = lazy(() => import('./pages/Earn'));
const Airdrop = lazy(() => import('./pages/Airdrop'));
const User = lazy(() => import('./pages/User'));

function App() {
  return (
    <MyProvider> {/* Wrap the app with your provider */}
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="earn" element={<Earn />} />
              <Route path="user/:id" element={<User />} />
              <Route path="airdrop" element={<Airdrop />} />
              <Route path="new-user" element={<WelcomeUser />} />
              {/* here start admin route section  */}
              <Route path="admin/login" element={< AdminLogin/>} />
              <Route path="admin/home" element={< AdminHomePage />} />
              <Route path="admin/task" element={ < AdminTaskPage />} />
              <Route path="admin/notice" element={ < AdminNotice />} />



            </Route>
          </Routes>
        </Suspense>
      </Router>
    </MyProvider>
  );
}

export default App;
