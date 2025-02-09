import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Camera, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useAuthStore } from '../lib/store';

export function Profile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80');

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header with Image */}
        <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <img
                src={imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <button className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                <Camera size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 p-8">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center gap-2 text-gray-900">
                  <Mail size={18} className="text-gray-500" />
                  <span>{user?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-gray-500" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="City, Country"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="e.g., Full Stack Development"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <input
                type="text"
                placeholder="Add your skills (e.g., JavaScript, React, Node.js)"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Save Button */}
            <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}