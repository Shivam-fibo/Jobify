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
  <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
  <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        Create a new account
      </h1>
      <form className="space-y-4 md:space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Register As</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
            <FaRegUser className="absolute right-6 top-2.5 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <FaPencilAlt className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
          <div className="relative">
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <MdOutlineMailOutline className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
          <div className="relative">
            <input
              type="number"
              placeholder="123-456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <FaPhoneFlip className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <div className="relative">
          
            <RiLock2Fill className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>

        

        <button
          type="submit"
          onClick={handleRegister}
          className="w-full text-white bg-blue-500 py-2 rounded-md hover:bg-blue-600 transition duration-200 dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          Register
        </button>

        <Link to="/login" className="block text-center text-blue-500 mt-4 dark:text-primary-500">
          Already have an account? Login here
        </Link>
      </form>
    </div>
  </div>
</section>


     
  </>
  
  );
};

export default Register;