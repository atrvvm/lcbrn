import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Briefcase, FolderKanban, User, Languages } from 'lucide-react';
import { useAuthStore } from '../lib/store';

const NavLink = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isActive 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export function Navbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">LCBRN</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <NavLink to="/search" icon={Search} label="Search" />
            <NavLink to="/services" icon={Briefcase} label="Services" />
            <NavLink to="/work" icon={FolderKanban} label="Work" />
            <NavLink to="/translate" icon={Languages} label="Translate" />
            {user ? (
              <NavLink to="/profile" icon={User} label="Profile" />
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <User size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}