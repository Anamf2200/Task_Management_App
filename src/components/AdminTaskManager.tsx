import React, { useState } from 'react';
import { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } from '../redux/tasks/tasks.Api';
import type { Task } from '../redux/tasks/task.type';
import { TaskStatus } from '../redux/tasks/task.type';
import Navbar from './Navbar';

const AdminTaskManager = () => {
  const { data: tasks, isLoading } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [formData, setFormData] = useState<Partial<Task>>({ title: '', description: '', status: TaskStatus.PENDING, });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateTask({ ...formData, id: editingId } as Task);
    } else {
      await addTask(formData);
    }
    setFormData({ title: '', description: '', status: TaskStatus.PENDING });
    setEditingId(null);
  };

  const handleEdit = (task: Task) => {
    setFormData(task);
    setEditingId(task.id);
  };

  if (isLoading) return <p>Loading tasks...</p>;

  return (

    <>

    <Navbar/>
    <div className="bg-white p-6 shadow-md rounded-lg border mt-8">
      <h3 className="text-xl font-bold text-amber-600 mb-4">Manage Tasks</h3>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="border rounded p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          className="border rounded p-2 w-full"
        />
        <select
  value={formData.status}
  onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
  className="border rounded p-2 w-full"
>
  <option value={TaskStatus.PENDING}>Pending</option>
  <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
  <option value={TaskStatus.COMPLETED}>Completed</option>
</select>
        <button
          type="submit"
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
        >
          {editingId ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <table className="w-full table-auto text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Status</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.description}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2 space-x-2 text-center">
                <button onClick={() => handleEdit(task)} className="text-yellow-500 hover:underline">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AdminTaskManager;
