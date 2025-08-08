// src/components/Navbar.jsx
import { FiSettings, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logout as apiLogout } from '../utils/api';
import logo from '../assets/logo.jpg';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const userMenuRef = useRef(null);
  const languageMenuRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
  ];

  // Extract first name from full name
  const getFirstName = (fullName) => {
    if (!fullName) return 'User';
    return fullName.trim().split(' ')[0];
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setIsLanguageMenuOpen(false);
    // Here you can add logic to actually change the app language
    console.log('Language changed to:', language.name);
  };

  return (
    <nav className="bg-green-700 shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side - Logo and mobile menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-white hover:bg-green-600 transition-colors"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="AgroSakha Logo"
              className="h-10 w-10 object-contain rounded-full bg-white"
            />
            <span className="text-2xl font-bold text-white tracking-wide hidden sm:inline">AgroSakha</span>
          </div>
        </div>

        {/* Right side - Language dropdown and user menu */}
        <div className="flex items-center space-x-3">
          {/* Language Dropdown */}
          <div className="hidden md:block relative" ref={languageMenuRef}>
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center space-x-1 px-3 py-2 text-white hover:bg-green-600 rounded-lg transition-colors text-sm font-medium"
            >
              <span>{selectedLanguage}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                      selectedLanguage === language.name 
                        ? 'bg-green-50 text-green-700 font-medium' 
                        : 'text-gray-700'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span>{language.name}</span>
                      <span className="text-xs opacity-75">{language.nativeName}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-white hover:bg-green-600 rounded-full transition-colors">
              <FiSettings className="h-5 w-5" />
            </button>
            <button className="p-2 text-white hover:bg-green-600 rounded-full relative transition-colors">
              <FiBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 text-white hover:bg-green-600 rounded-full transition-colors"
              >
                <FiUser className="h-5 w-5" />
                {user && (
                  <span className="hidden md:inline text-sm font-medium">
                    {getFirstName(user.name)}
                  </span>
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                  
                  {/* Mobile Language Selection */}
                  <div className="md:hidden border-b">
                    <div className="px-4 py-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                      Language
                    </div>
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          selectedLanguage === language.name 
                            ? 'bg-green-50 text-green-700 font-medium' 
                            : 'text-gray-700'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{language.name}</span>
                          <span className="text-xs opacity-75">{language.nativeName}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;