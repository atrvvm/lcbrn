import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './src/components/Navbar';
import { Search } from './src/pages/Search';
import { Candidates } from './src/pages/Candidate';
import { Work } from './src/pages/Work';
import { Profile } from './src/pages/Profile';
import { Translate } from './src/pages/Translate';
import { Login } from './src/pages/Login';
import { Register } from './src/pages/Register';
import { ProtectedRoute } from './src/components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <Routes>
            {/* Redirect root to search */}
            <Route path="/" element={<Search />} />
            {/* Keep search route for direct navigation */}
            <Route path="/search" element={<Navigate to="/" replace />} />
            <Route path="/services" element={<Candidates />} />
            <Route path="/work" element={<Work />} />
            <Route path="/translate" element={<Translate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;