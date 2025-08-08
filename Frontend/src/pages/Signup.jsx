import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/api';
import TypewriterEffect from '../components/TypewriterEffect';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    farmLocation: '',
    farmSize: '',
    crops: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cropInput, setCropInput] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleAddCrop = () => {
    if (cropInput.trim() && !formData.crops.includes(cropInput.trim())) {
      setFormData({
        ...formData,
        crops: [...formData.crops, cropInput.trim()]
      });
      setCropInput('');
    }
  };

  const handleRemoveCrop = (cropToRemove) => {
    setFormData({
      ...formData,
      crops: formData.crops.filter(crop => crop !== cropToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCrop();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        farmLocation: formData.farmLocation,
        farmSize: formData.farmSize ? parseFloat(formData.farmSize) : undefined,
        crops: formData.crops
      };

      const response = await register(registrationData);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 to-blue-50">
      {/* Left side - Welcome Section */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/login.webp"
            alt="Agricultural background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/80 to-green-700/90"></div>
        </div>
        
        {/* Content - Perfectly Centered */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 py-16 min-h-full">
          {/* Logo */}
          <div className="mb-8">
            <img
              className="h-20 w-20 mx-auto rounded-full shadow-2xl ring-4 ring-white/20"
              src="/src/assets/logo.jpg"
              alt="AgroSakha"
            />
          </div>
          
          {/* Welcome Message */}
          <div className="space-y-6 text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to
              <span className="block text-yellow-300 mt-2">
                <TypewriterEffect 
                  text="AgroSakha" 
                  speed={150} 
                  delay={500}
                  className="inline-block"
                />
              </span>
            </h1>
            <p className="text-xl opacity-90 max-w-md leading-relaxed">
              Join thousands of farmers managing their farms more efficiently
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 space-y-6">
            <div className="flex items-center text-white/90">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4 shadow-lg"></div>
              <span className="text-lg">Free to use for all farmers</span>
            </div>
            <div className="flex items-center text-white/90">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4 shadow-lg"></div>
              <span className="text-lg">Comprehensive farming tools</span>
            </div>
            <div className="flex items-center text-white/90">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4 shadow-lg"></div>
              <span className="text-lg">Expert guidance and support</span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12 bg-white/95 backdrop-blur-sm">
        <div className="max-w-md w-full space-y-6">
          {/* Mobile Logo */}
          <div className="text-center lg:hidden">
            <img
              className="mx-auto h-16 w-16 rounded-full shadow-lg"
              src="/src/assets/logo.jpg"
              alt="AgroSakha"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Welcome to <TypewriterEffect text="AgroSakha" speed={150} delay={300} className="text-green-600" />
            </h2>
          </div>

          {/* Form Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 hidden lg:block">
              Create your account
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 lg:hidden">
              Create account
            </h3>
            <p className="mt-3 text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Signup Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Farm Location */}
              <div>
                <label htmlFor="farmLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Location
                </label>
                <input
                  id="farmLocation"
                  name="farmLocation"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  placeholder="Enter your farm location"
                  value={formData.farmLocation}
                  onChange={handleChange}
                />
              </div>

              {/* Farm Size */}
              <div>
                <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Size (in acres)
                </label>
                <input
                  id="farmSize"
                  name="farmSize"
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  placeholder="Enter farm size"
                  value={formData.farmSize}
                  onChange={handleChange}
                />
              </div>

              {/* Crops */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crops You Grow
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                    placeholder="Enter crop name"
                    value={cropInput}
                    onChange={(e) => setCropInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    type="button"
                    onClick={handleAddCrop}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-r-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-sm"
                  >
                    Add
                  </button>
                </div>
                {formData.crops.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.crops.map((crop, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                      >
                        {crop}
                        <button
                          type="button"
                          onClick={() => handleRemoveCrop(crop)}
                          className="ml-2 text-green-600 hover:text-green-800 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-green-600 hover:text-green-500">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-green-600 hover:text-green-500">Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
