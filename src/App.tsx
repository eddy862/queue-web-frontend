import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/login/Index';
import Home from './pages/home/Index';
import Vendor from './pages/vendor/Index';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vendor/:id" element={<Vendor />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
