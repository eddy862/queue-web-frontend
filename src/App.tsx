import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/login/Index';
import Vendor from './pages/vendor/Index';
import VendorLayout from './layouts/VendorLayout';
import Fallback from './pages/fallback/Index';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Fallback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vendor/:id" element={
            <VendorLayout>
              <Vendor />
            </VendorLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
