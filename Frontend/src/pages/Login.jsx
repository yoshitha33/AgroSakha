import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import TypewriterEffect from '../components/TypewriterEffect';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await login(formData);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
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
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-18 py-14 min-h-full">
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
              Your comprehensive farming management solution for smarter agriculture
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 space-y-6">
            <div className="flex items-center text-white/90">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4 shadow-lg"></div>
              <span className="text-lg">Track expenses and manage budgets</span>
            </div>
            <div className="flex items-center text-white/90">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4 shadow-lg"></div>
              <span className="text-lg">Monitor weather and market prices</span>
            </div>
            <div className="flex items-center text-white/90">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4 shadow-lg"></div>
              <span className="text-lg">Access government schemes and support</span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12 bg-white/95 backdrop-blur-sm">
        <div className="max-w-md w-full space-y-8">
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
              Sign in to your account
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 lg:hidden">
              Sign in to continue
            </h3>
            <p className="mt-3 text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
            <p className="text-xs text-gray-600 text-center">
              <span className="font-medium">Demo:</span> Use any email and password to test the system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
