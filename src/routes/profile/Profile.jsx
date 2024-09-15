import React from 'react';
import { Outlet } from 'react-router-dom';
import { useProfileQuery } from '../../redux/api/profileApi';

const Profile = () => {
  const { data } = useProfileQuery();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      {data && data.payload && (
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src={data.payload.photo_url} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data.payload.username}</h1>
              <p className="text-gray-500">{data.payload.first_name}</p>
            </div>
          </div>

          <div className="space-y-4">
          

          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Profile;
