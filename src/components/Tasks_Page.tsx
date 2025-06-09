import React from 'react';
import { useGetTasksQuery } from '../redux/tasks/tasks.Api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/users/auth/authSlice';
import Navbar from './Navbar';
import { TaskStatus } from '../redux/tasks/task.type';

const Tasks_Page = () => {
  const { data: tasks, isLoading } = useGetTasksQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

 

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-amber-600">My Tasks</h2>
        </div>

        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => (
              <tr key={task.id} className={`border-t hover:bg-gray-50 transition ${
    task.status === TaskStatus.COMPLETED ? 'opacity-50 line-through' : ''
  }`}>
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.description}</td>
                <td className="p-2 capitalize">{task.status}</td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tasks_Page;
