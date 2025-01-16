import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import AuthChoicePage from './AuthChoicePage';
import VerifyCodePage from './VerifyCodePage';
import VerifyQRPage from './VerifyQRPage';
import HomePage from './HomePage';  // ou './pages/HomePage'
function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('user-token') !== null;
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth-choice" element={<AuthChoicePage />} />
        <Route path="/verify-code" element={<VerifyCodePage />} />
        <Route path="/verify-qr" element={<VerifyQRPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />}
        />
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;