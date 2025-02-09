import React, { useState } from 'react';
import { Plus, X, MapPin, Clock, FileCheck } from 'lucide-react';
import { useAuthStore } from '../lib/store';

interface WorkListing {
  id: string;
  title: string;
  description: string;
  duration: string;
  budget: string;
  location: string;
  experienceYears: number;
  requiresReferences: boolean;
  skills: string[];
  imageUrl?: string;
}

const initialListings: WorkListing[] = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    description: 'Looking for a full-stack developer to build a modern e-commerce platform. The project involves developing both frontend and backend components, implementing payment processing, and setting up a product management system.',
    duration: '6 months',
    budget: '$30,000 - $40,000',
    location: 'Remote (US)',
    experienceYears: 3,
    requiresReferences: true,
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80'
  },
  {
    id: '2',
    title: 'Mobile App Development Project',
    description: 'Seeking an experienced mobile developer for a long-term project to build a fitness tracking app. The project includes user authentication, real-time tracking, and integration with wearable devices.',
    duration: '8 months',
    budget: '$45,000 - $60,000',
    location: 'Hybrid (New York)',
    experienceYears: 5,
    requiresReferences: true,
    skills: ['React Native', 'Firebase', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
  }
];

export function Work() {
  const user = useAuthStore((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [listings, setListings] = useState<WorkListing[]>(initialListings);
  const [newListing, setNewListing] = useState<Partial<WorkListing>>({
    title: '',
    description: '',
    duration: '',
    budget: '',
    location: '',
    experienceYears: 0,
    requiresReferences: false,
    skills: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const listing: WorkListing = {
      id: Date.now().toString(),
      title: newListing.title || '',
      description: newListing.description || '',
      duration: newListing.duration || '',
      budget: newListing.budget || '',
      location: newListing.location || '',
      experienceYears: newListing.experienceYears || 0,
      requiresReferences: newListing.requiresReferences || false,
      skills: newListing.skills || []
    };

    setListings([listing, ...listings]);
    setShowForm(false);
    setNewListing({
      title: '',
      description: '',
      duration: '',
      budget: '',
      location: '',
      experienceYears: 0,
      requiresReferences: false,
      skills: []
    });
  };

  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newSkill = e.currentTarget.value.trim();
      if (newSkill && newListing.skills) {
        setNewListing({
          ...newListing,
          skills: [...newListing.skills, newSkill]
        });
        e.currentTarget.value = '';
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (newListing.skills) {
      setNewListing({
        ...newListing,
        skills: newListing.skills.filter(skill => skill !== skillToRemove)
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Work Listings</h1>
        {user && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={20} />
            <span>Post Listing</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Post New Work Listing</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newListing.title}
                  onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newListing.description}
                  onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="text"
                    value={newListing.duration}
                    onChange={(e) => setNewListing({ ...newListing, duration: e.target.value })}
                    placeholder="e.g., 6 months"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Budget</label>
                  <input
                    type="text"
                    value={newListing.budget}
                    onChange={(e) => setNewListing({ ...newListing, budget: e.target.value })}
                    placeholder="e.g., $30,000 - $40,000"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={newListing.location}
                    onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                    placeholder="e.g., Remote (US)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <input
                    type="number"
                    value={newListing.experienceYears}
                    onChange={(e) => setNewListing({ ...newListing, experienceYears: parseInt(e.target.value) })}
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newListing.requiresReferences}
                    onChange={(e) => setNewListing({ ...newListing, requiresReferences: e.target.checked })}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Requires References</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Skills (Press Enter to add)</label>
                <input
                  type="text"
                  onKeyDown={handleSkillInput}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Add required skills"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {newListing.skills?.map((skill) => (
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
                Post Listing
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{listing.title}</h3>
                  <p className="text-gray-600 mb-4">{listing.description}</p>
                </div>
                {listing.imageUrl && (
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-32 h-32 object-cover rounded-lg ml-4"
                  />
                )}
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Duration</h4>
                  <p className="text-gray-900">{listing.duration}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Budget</h4>
                  <p className="text-gray-900">{listing.budget}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Location</h4>
                    <p className="text-gray-900">{listing.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Experience Required</h4>
                    <p className="text-gray-900">{listing.experienceYears}+ years</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck size={16} className="text-gray-500" />
                  <h4 className="text-sm font-medium text-gray-700">
                    {listing.requiresReferences ? 'References Required' : 'No References Required'}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {listing.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}