import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router';
import NavBar from './components/navbar/NavBar';
import LandingPage from './pages/LandingPage';
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
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/home" element={<div>Home</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  )
}

export default App