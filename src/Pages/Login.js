import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", formData);
   
  
      // Check if the request was successful (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        toast.success("Login Successful");
        console.log("Login successful");
        localStorage.setItem("token",JSON.stringify(response.data.token));
        navigate("/admin");
      
        
      } else if (response.status === 401) {
        // Handle unsuccessful response
        if (response.data.success === false && response.data.message === "Password is incorrect") {
          // Password is incorrect
          toast("Password is incorrect");
          console.log("Password is incorrect");
        } else {
          // Other authentication error
          console.log("Authentication failed for other reasons");
        }
      }
    } catch (error) {
      // Handle error if the request fails
      toast.error("login failed")
      console.log("Error while sending Login data to backend:", error.message);
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
        <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
        <form onSubmit={handleOnSubmit} className="space-y-4">
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
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
          <div className='flex space-x-4 justify-end'>
          <h1 className=''>Dont have an account ?</h1>
            <Link to="/signup" className="text-blue-500 hover:underline">
             Sign_UP 
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
