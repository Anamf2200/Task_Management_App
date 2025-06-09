import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../redux/users/user.Api';

const ViewUser = () => {
  const { id } = useParams();
  const { data: users, isLoading } = useGetUsersQuery();

  const user = users?.find(u => u.id === Number(id));

  if (isLoading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (!user) return <p className="text-center text-red-600 mt-10">User not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-amber-600 mb-6 text-center">User Details</h2>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <p className="font-semibold text-gray-600">Name:</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Email:</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Role:</p>
            <p>{user.role}</p>
          </div>
          <div>
            <Link to="/home" className='list-none text-blue-700 font-light text-2xl'>Back to list</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
