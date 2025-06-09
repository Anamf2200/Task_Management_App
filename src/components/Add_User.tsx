import { useEffect, useState } from "react";
import { useAddUserMutation, useUpdateUserMutation } from '../redux/users/user.Api';
import type { User } from '../redux/users/user.type';
import  {Role} from '../redux/users/user.type'


interface Props{
  selectedUser?:User|null;
  onSuccess:()=>void;

}

const AdminAddUser:React.FC<Props> = ({selectedUser,onSuccess}) => {



  const [name, setName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [role, setrole] = useState("")
const [addUser] =useAddUserMutation()
const [updateUser]=useUpdateUserMutation()





useEffect(() => {
 if(selectedUser){
  setName(selectedUser.name);
  setemail(selectedUser.email);
  setpassword(selectedUser.password);
  setrole(selectedUser.role);

 }
}, [selectedUser])

const handleSubmit= async(e:React.FormEvent)=>{
  e.preventDefault();
  if(!name||!email)return;

  const payload={
    name,
    email,
    password,
    role:role as Role
  }

  if(selectedUser){
    await updateUser({...selectedUser,...payload}).unwrap();
    alert("User updated successfully")
  }
  else{
  try {
  await addUser(payload).unwrap();
  alert('User added successfully');
} catch (err: any) {
  // console.log("❌ Error response:", err);
  alert("Failed to add user. Check console for details.");
}
  }
  setName('');
  setemail('');
  setpassword('');
  setrole('')
  onSuccess();

}

 

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-amber-600 mb-6">
          Add New User
        </h2>

        <form className="space-y-5"onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter full name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e)=> setemail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e)=> setpassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e)=> setrole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select Role</option>
              <option value={Role.FRONT_END_DEVELOPER}>Front_end developer</option>
              <option value={Role.SOCIAL_MEDIA_EXECUTIVE}>Social_media executive</option>
              <option value={Role.DIGITAL_MARKETER}>Digital_marketer</option>


            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition"
            >
{selectedUser?'Update' :'Add' }            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddUser;
