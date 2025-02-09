import React from 'react';
import { Plus, Mail, Phone, Briefcase, MapPin } from 'lucide-react';
import { useAuthStore } from '../lib/store';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  location: string;
  imageUrl?: string;
}

const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 123-4567',
    specialty: 'Full Stack Development',
    location: 'San Francisco, CA',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus.r@example.com',
    phone: '+1 (555) 987-6543',
    specialty: 'Mobile App Development',
    location: 'Remote (US)',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  }
];

export function Candidates() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Available Candidates</h1>
        {user && (
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Plus size={20} />
            <span>Add Profile</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                {candidate.imageUrl && (
                  <img
                    src={candidate.imageUrl}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <MapPin size={16} />
                    <span>{candidate.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={18} />
                  <a href={`mailto:${candidate.email}`} className="hover:text-indigo-600">
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={18} />
                  <a href={`tel:${candidate.phone}`} className="hover:text-indigo-600">
                    {candidate.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={18} />
                  <span>{candidate.specialty}</span>
                </div>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Mail size={18} />
                Contact Candidate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}