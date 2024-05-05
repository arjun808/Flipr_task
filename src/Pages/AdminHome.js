import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    toast.success("Signing out...");
    navigate("/login");
    console.log("Signing out...");
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://flipr-task.onrender.com/api/v1/auth/deleteuser/${userId}`);
      toast.success("User deleted successfully");
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("https://flipr-task.onrender.com/api/v1/auth/allusers");
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="block h-8 w-auto" src="/logo.svg" alt="Logo" />
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
             
            </div>
            <div className="hidden sm:block sm:ml-6">
              <button onClick={handleSignOut} className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Out</button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome to the Admin Panel Dashboard!</h1>
         
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
          <ul className="divide-y divide-gray-200">
            {users.map(user => (
              <li key={user._id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button onClick={() => deleteUser(user._id)} className="text-red-500 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
