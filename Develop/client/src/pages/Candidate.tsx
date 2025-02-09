import React, { useState } from 'react';
import { Plus, Mail, Phone, Briefcase, MapPin, Search, X, Camera } from 'lucide-react';
import { useAuthStore } from '../lib/store';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  location: string;
  bio?: string;
  skills?: string[];
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
    bio: 'Full stack developer with 5 years of experience in React and Node.js',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus.r@example.com',
    phone: '+1 (555) 987-6543',
    specialty: 'Mobile App Development',
    location: 'Remote (US)',
    bio: 'Mobile developer specializing in React Native and iOS development',
    skills: ['React Native', 'iOS', 'Swift', 'Firebase'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
  }
];

export function Candidates() {
  const user = useAuthStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [newCandidate, setNewCandidate] = useState<Partial<Candidate>>({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    location: '',
    bio: '',
    skills: []
  });

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === '' || candidate.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const candidate: Candidate = {
      id: Date.now().toString(),
      name: newCandidate.name || '',
      email: newCandidate.email || '',
      phone: newCandidate.phone || '',
      specialty: newCandidate.specialty || '',
      location: newCandidate.location || '',
      bio: newCandidate.bio,
      skills: newCandidate.skills || [],
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    };

    setCandidates([candidate, ...candidates]);
    setShowForm(false);
    setNewCandidate({
      name: '',
      email: '',
      phone: '',
      specialty: '',
      location: '',
      bio: '',
      skills: []
    });
  };

  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newSkill = e.currentTarget.value.trim();
      if (newSkill && newCandidate.skills) {
        setNewCandidate({
          ...newCandidate,
          skills: [...newCandidate.skills, newSkill]
        });
        e.currentTarget.value = '';
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (newCandidate.skills) {
      setNewCandidate({
        ...newCandidate,
        skills: newCandidate.skills.filter(skill => skill !== skillToRemove)
      });
    }
  };

  return (
    <div className="space-y-8 pt-[8rem]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Available Candidates</h1>
        {user && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={20} />
            <span>Add Profile</span>
          </button>
        )}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, specialty, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Add Profile Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Your Profile</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newCandidate.email}
                    onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={newCandidate.phone}
                    onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={newCandidate.location}
                    onChange={(e) => setNewCandidate({ ...newCandidate, location: e.target.value })}
                    placeholder="e.g., San Francisco, CA"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Specialty</label>
                <input
                  type="text"
                  value={newCandidate.specialty}
                  onChange={(e) => setNewCandidate({ ...newCandidate, specialty: e.target.value })}
                  placeholder="e.g., Full Stack Development"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={newCandidate.bio}
                  onChange={(e) => setNewCandidate({ ...newCandidate, bio: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tell potential clients about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Skills (Press Enter to add)</label>
                <input
                  type="text"
                  onKeyDown={handleSkillInput}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Add your skills"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {newCandidate.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-indigo-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Profile
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
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

              {candidate.bio && (
                <p className="text-gray-600">{candidate.bio}</p>
              )}

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

              {candidate.skills && (
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

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