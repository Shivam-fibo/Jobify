import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";


const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
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
      <h3 className="text-2xl font-semibold text-center">Create a new account</h3>
    </div>
    <form>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Register As</label>
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
        <label className="block text-sm font-medium mb-1">Name</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaPencilAlt className="absolute right-3 top-2.5 text-gray-500" />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <div className="relative">
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdOutlineMailOutline className="absolute right-3 top-2.5 text-gray-500" />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <div className="relative">
          <input
            type="number"
            placeholder="12345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaPhoneFlip className="absolute right-3 top-2.5 text-gray-500" />
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
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Register
      </button>
      <Link to="/login" className="block text-center text-blue-500 mt-4">
        Login Now
      </Link>
    </form>
  </div>
</section>

  </>
  
  );
};

export default Register;