import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <Link to="/" className="text-green-600 hover:text-green-700">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
