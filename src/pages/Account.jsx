import React from 'react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Account</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Account Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{user?.name || 'John Doe'}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{user?.email || 'john@example.com'}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Your Orders</h2>
          <p className="text-gray-600 mb-4">Track, return, or buy things again</p>
          <button className="text-blue-600 font-medium">Your Orders</button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Your Lists</h2>
          <p className="text-gray-600 mb-4">View and edit lists</p>
          <button className="text-blue-600 font-medium">Your Lists</button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Login & Security</h2>
          <p className="text-gray-600 mb-4">Edit login, name, and mobile number</p>
          <button className="text-blue-600 font-medium">Edit</button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Prime</h2>
          <p className="text-gray-600 mb-4">View benefits and payment settings</p>
          <button className="text-blue-600 font-medium">Manage Prime Membership</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
