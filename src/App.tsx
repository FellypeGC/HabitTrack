import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HabitProvider } from './context/HabitContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { LandingPage } from './pages/LandingPage';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('habittrack:auth') === 'true';
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('habittrack:auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('habittrack:auth');
    navigate('/login');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />
      <Route
        path="/forgot-password"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPassword />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <HabitProvider>
          <Router>
            <AppContent />
          </Router>
        </HabitProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
