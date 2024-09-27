import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  return (
    <>
  <section className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="bg-white shadow-lg rounded-lg p-8">
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-center">Login to your account</h3>
    </div>
    <form>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Login As</label>
        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="Employer">Employer</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>
          <FaRegUser className="absolute right-3 top-2.5 text-gray-500" />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <div className="relative">
          <input
            type="email"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdOutlineMailOutline className="absolute right-3 top-2.5 text-gray-500" />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <RiLock2Fill className="absolute right-3 top-2.5 text-gray-500" />
        </div>
      </div>
      <button
        type="submit"
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
      <Link to="/register" className="block text-center text-blue-500 mt-4">
        Register Now
      </Link>
    </form>
  </div>
</section>

  </>
  
  );
};

export default Login;