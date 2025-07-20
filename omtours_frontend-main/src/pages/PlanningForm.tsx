import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, ArrowLeft, Loader2, IndianRupee } from 'lucide-react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

import { useAuthStore } from '../store/authUser';
import { toast } from 'react-toastify';

interface FormData {
  source: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  travelMode: string;
  hotelPreference: string;
  locationPreference: string[];
  dietaryPreferences: string[];
  groupType: string;
  budget: number;
  specialRequirements: string;
}

interface TravelPlan {
  transportation: string;
  accommodation: string;
  highlights: string;
  itinerary: string;
  additional: string;
}

const PlanningForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [activeTab, setActiveTab] = useState<keyof TravelPlan>('transportation');
  
  const [formData, setFormData] = useState<FormData>({
    source: '',
    destination: '',
    dateFrom: '',
    dateTo: '',
    travelMode: '',
    hotelPreference: '',
    locationPreference: [],
    dietaryPreferences: [],
    groupType: '',
    budget: 50000,
    specialRequirements: '',
  });

  const locationTypes = [
    'Mountains',
    'Beaches',
    'Cities',
    'Historical Sites',
    'Wildlife',
    'Adventure Sports',
  ];

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Halal',
    'Kosher',
    'Gluten-Free',
    'No Preferences',
  ];

  

  const handleLocationPreferenceChange = (location: string) => {
    setFormData(prev => ({
      ...prev,
      locationPreference: prev.locationPreference.includes(location)
        ? prev.locationPreference.filter(l => l !== location)
        : [...prev.locationPreference, location],
    }));
  };

  const handleDietaryPreferenceChange = (diet: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(diet)
        ? prev.dietaryPreferences.filter(d => d !== diet)
        : [...prev.dietaryPreferences, diet],
    }));
  };

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
// Check user authentication
const { user,authCheck,logout} = useAuthStore();

        React.useEffect(() => {
          authCheck();
        }, [authCheck]);
let name = "Guest";//null
if (user) { name=user.username;} 
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    if (!user) {
      setIsLoading(false);
      toast.error("Please log in to generate your travel plan!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    if(user){
      console.log("Data Sent to Database");
      await axios.get(`https://om-tours.onrender.com/search/${formData.source}`);
      await axios.get(`https://om-tours.onrender.com/search/${formData.destination}`);
  }
    try {
       const response = await axios.post(`$https://om-tours.onrender.com/plan`, formData);

      console.log('Success:', response.data);
    } catch (error) { 
      console.error('Error submitting form:', error);
    }

    navigate('/tour');
  };
   const { googleOAuthLogin } = useAuthStore();
  
    const login = useGoogleLogin({
      flow: 'auth-code',
      onSuccess: async (codeResponse: { code: string }) => {
        try {
          await googleOAuthLogin(codeResponse.code);
        } catch (error) {
          console.error('Google OAuth failed:', error);
        }
      },
      onError: (error) => {
        console.error('Login error:', error);
      },
      scope: 'openid email profile https://www.googleapis.com/auth/calendar',
    });
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Top-right controls */}
    <div className="absolute top-4 right-4 z-50 flex items-center gap-6">
      {user ? (
    <>
      <div className="flex items-center gap-6">
       {/* Logout Button */}
      <button
        className="text-yellow-400 hover:text-red-500 font-bold text-xl transition-colors"
        onClick={logout}
      >
        LogOut
      </button>
      </div>       
    </>
  ) : (
    <>
      
      {/* <a
        href="/signup"
        className="text-green-400 font-bold text-lg cursor-pointer hover:text-yellow-800 transition-colors"
      >
        Sign Up
      </a> */}
      <span
      onClick={login}
          className="flex items-center gap-2 bg-white text-gray-700 px-4 py-1 rounded-lg shadow hover:shadow-md transition-all border border-gray-300 hover:bg-gray-300 font-medium"
        >
          <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google logo"
        className="w-5 h-5"
      />
          LogIn/SignUp
      </span>
    </>
  )}
</div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <Globe2 className="w-6 h-6 text-sky-500" />
              <span className="text-xl font-bold text-gray-900">Om Tours</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Plan Your Dream Journey - {name}</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        
        {!travelPlan ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Basic Travel Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source Location</label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Enter your starting point"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Where do you want to go?"
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                <input
                  type="date"
                  value={formData.dateFrom}
                  onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                <input
                  type="date"
                  value={formData.dateTo}
                  onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Budget Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget {formatBudget(formData.budget)}
              </label>
              <div className="flex items-center gap-4">
                <IndianRupee className="w-5 h-5 text-gray-400" />
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
            </div>

            {/* Travel Mode & Hotel Preference */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mode of Travel</label>
                <select
                  value={formData.travelMode}
                  onChange={(e) => setFormData({ ...formData, travelMode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                >
                  <option value="">Select travel mode</option>
                  <option value="flight">Flight</option>
                  <option value="train">Train</option>
                  <option value="bus">Bus</option>
                  <option value="car">Car</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Preference</label>
                <select
                  value={formData.hotelPreference}
                  onChange={(e) => setFormData({ ...formData, hotelPreference: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                >
                  <option value="">Select hotel type</option>
                  <option value="luxury">Luxury (5 Star)</option>
                  <option value="premium">Premium (4 Star)</option>
                  <option value="comfort">Comfort (3 Star)</option>
                  <option value="budget">Budget Friendly</option>
                </select>
              </div>
            </div>

            {/* Location Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Location Preferences</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {locationTypes.map((location) => (
                  <label key={location} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.locationPreference.includes(location)}
                      onChange={() => handleLocationPreferenceChange(location)}
                      className="rounded text-sky-500 focus:ring-sky-500"
                    />
                    <span className="text-sm text-gray-700">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dietary Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Preferences</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietaryOptions.map((diet) => (
                  <label key={diet} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.dietaryPreferences.includes(diet)}
                      onChange={() => handleDietaryPreferenceChange(diet)}
                      className="rounded text-sky-500 focus:ring-sky-500"
                    />
                    <span className="text-sm text-gray-700">{diet}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Group Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
              <select
                value={formData.groupType}
                onChange={(e) => setFormData({ ...formData, groupType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                required
              >
                <option value="">Select group type</option>
                <option value="family">Family with Children</option>
                <option value="elderly">Senior Citizens</option>
                <option value="couple">Couple</option>
                <option value="friends">Friends Group</option>
                <option value="solo">Solo Traveler</option>
              
              </select>
            </div>

            {/* Special Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
              <textarea
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                rows={4}
                placeholder="Any special requirements or preferences? (e.g., wheelchair accessibility, specific activities, etc.)"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Generate My Travel Plan'
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
              {(Object.keys(travelPlan) as Array<keyof TravelPlan>).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="prose max-w-none">
              {travelPlan[activeTab].split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setTravelPlan(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium"
              >
                Modify Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningForm;