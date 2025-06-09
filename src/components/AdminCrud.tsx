import { useState } from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "../redux/users/user.Api";
import type { User } from "../redux/users/user.type";
import Add_User from "./Add_User";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/users/auth/authSlice";
import AdminTaskManager from "./AdminTaskManager";
import Navbar from "./Navbar";

const AdminCrudTable = () => {

const [deleteUser]=useDeleteUserMutation();

const{data,error,isLoading,isFetching }=useGetUsersQuery();
const [selectedUser, setselectedUser] = useState <User|null>(null)


 const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts!</p>;



  return (
<>
           <Navbar/>

    <div className="min-h-screen bg-gray-50 p-6">
      <Add_User selectedUser={selectedUser}
    onSuccess={()=>setselectedUser(null)}/>
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-amber-600">Manage Users</h2>
       

        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">

              {data?.map((usr:User)=>(


 <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{usr.name}</td>
                <td className="px-6 py-4">{usr.email}</td>
                <td className="px-6 py-4">{usr.role}</td>
             
                <td className="px-6 py-4 text-center space-x-2">{}
 <NavLink to={`/view/${usr.id}`} className="text-blue-600 hover:underline">
                      View
                    </NavLink>                
                  <button className="text-yellow-500 hover:underline"onClick={()=>setselectedUser(usr)}>Edit</button>
                  <button className="text-red-600 hover:underline" onClick={()=>deleteUser(usr.id)}>Delete</button>
                </td>
              </tr>
              

              ))}

              
             

            </tbody>
          </table>
        </div>
      </div>
   
    </div>
    </>
  );
};

export default AdminCrudTable;
