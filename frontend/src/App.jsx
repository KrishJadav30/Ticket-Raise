import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import { MonitorPlay, ShieldAlert, UserPlus } from 'lucide-react';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        
        {/* Navigation Header */}
        <header className="header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MonitorPlay className="header-icon" size={32} />
            <h1>Company IT Helpdesk</h1>
          </div>
          
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" style={navLinkStyle}>
              <UserPlus size={18} /> User Portal
            </Link>
            <Link to="/admin" style={navLinkStyle}>
              <ShieldAlert size={18} /> Admin Dashboard
            </Link>
          </nav>
        </header>
        
        {/* Page Content Routes */}
        <main className="main-content" style={{ display: 'block' }}>
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}

// Inline styles for the nav buttons just to keep it clean
const navLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  backgroundColor: '#ffffff',
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: 'bold',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
};

export default App;