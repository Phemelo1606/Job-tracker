import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './ProtectedRoute'
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/RegisterPage';
import {Home } from './pages/HomePage';
import JobDeatails from './pages/JobDetailsPage';
import NotFound from './pages/NotFoundPage';
import './App.css'

interface User {
  id: number;
  username: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { pathname } = useLocation();

  // The landing page has its own navbar (LandingPageNavBar)
  const showNavBar = pathname !== '/';

  return (
    <>
      {showNavBar && (
        <NavBar currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />} >
          <Route path="/home" element={<Home/>} />
          <Route path="/jobs/:id" element={ <JobDeatails/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App