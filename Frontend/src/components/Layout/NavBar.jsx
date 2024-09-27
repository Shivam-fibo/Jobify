import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={`bg-white mb-4 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50 ${isAuthorized ? "block" : "hidden"}`}>
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        {/* Replace with your logo image */}
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="MyApp Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MyApp</span>
      </Link>
      
      {/* Hamburger Button for Mobile */}
      <button 
        onClick={() => setShow(!show)} 
        type="button" 
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
        aria-controls="navbar-default" 
        aria-expanded={show ? "true" : "false"}
      >
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      
      {/* Menu Section */}
      <div className={`hidden w-full md:block md:w-auto ${show ? "block" : "hidden"}`} id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link to="/" onClick={() => setShow(false)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home</Link>
          </li>
          <li>
            <Link to="/job/getall" onClick={() => setShow(false)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">All Jobs</Link>
          </li>
          <li>
            <Link to="/applications/me" onClick={() => setShow(false)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post" onClick={() => setShow(false)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">POST NEW JOB</Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setShow(false)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">VIEW YOUR JOBS</Link>
              </li>
            </>
          )}
          <li>
            <button onClick={handleLogout} className="log_btn bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  

  )
};

export default Navbar;