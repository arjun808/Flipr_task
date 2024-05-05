import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from "axios"
import toast from 'react-hot-toast';
function Signup() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    confirmPassword:'',

    

  });
  const {firstName,lastName, email, password,confirmPassword } = formData;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/signup", formData);
      // console.log(response);
  
      // Check if the request was successful (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        toast.success("Signup Successful")
       navigate("/login")
        
        // Optionally, you can redirect the user or perform other actions here
      } else {
        // Handle unsuccessful response
        console.log("Signup failed");
      }
    } catch{
      // Handle error if the request fails
      console.log("Error while sending signup data to backend");
    }
  };
  
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6">Sign_Up</h1>
        <form onSubmit={handleOnSubmit} className="space-y-4">
        <div>
            <label className="block mb-2">
              <span className="text-gray-700">First Name *</span>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="First name"
                className="form-input mt-1 block w-full"
              />
            </label>
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-gray-700">Last Name *</span>
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Last Name"
                className="form-input mt-1 block w-full"
              />
            </label>
          </div>


          <div>
            <label className="block mb-2">
              <span className="text-gray-700">Email Address *</span>
              <input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                className="form-input mt-1 block w-full"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              <span className="text-gray-700">Password *</span>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                  className="form-input mt-1 block w-full"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-0 right-0 mt-1 mr-2 cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-6 w-6" />
                  ) : (
                    <AiOutlineEye className="h-6 w-6" />
                  )}
                </span>
              </div>
            </label>
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-gray-700"> Confirm Password *</span>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm password"
                  className="form-input mt-1 block w-full"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-0 right-0 mt-1 mr-2 cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-6 w-6" />
                  ) : (
                    <AiOutlineEye className="h-6 w-6" />
                  )}
                </span>
              </div>
            </label>
          </div>

         
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
          <div className='flex justify-end space-x-4'>
          <h1>Already have an account?</h1>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login hear
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
