import React, { useState } from 'react';
import { BriefcaseIcon, ArrowRight, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { LoginModal } from '../components/LoginModal';

export function Search() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleActionClick = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="space-y-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Search</h1>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Looking for Work Section */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-10 rounded-lg">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Looking for Work?</h2>
                <p className="mt-1 text-blue-100">Find your next opportunity and showcase your skills</p>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => handleActionClick('/work')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Browse Listings
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-700">
            <p className="text-blue-100 text-sm">
              {user ? 'Discover opportunities matching your skills and experience' : 'Sign in to apply for work opportunities'}
            </p>
          </div>
        </div>

        {/* Looking to Hire Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-10 rounded-lg">
                <BriefcaseIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Looking to Hire?</h2>
                <p className="mt-1 text-indigo-100">Post a work listing and find the perfect candidate</p>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => handleActionClick('/work')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                Post a Listing
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700">
            <p className="text-indigo-100 text-sm">
              {user ? 'Share job opportunities with our community of professionals' : 'Sign in to post work opportunities'}
            </p>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}