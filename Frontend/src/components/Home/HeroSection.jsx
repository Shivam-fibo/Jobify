import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

const HeroSection = () => {
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
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <div className="container h-screen mx-auto px-4 py-8">
      
      <div className="text-center">


      <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {user && user.role === "Job Seeker"
          ? "Find Your Dream Job"
          : "Streamline Your Hiring Process"}
      </h2>
  
      <p className="mb-8 text-xl font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        {user && user.role === "Job Seeker"
          ? "Search and apply for your dream job, manage applications, and track your progress all in one place."
          : "Post job listings, manage applications, and streamline the hiring process with our job portal designed for employers."}
      </p>
  
      <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <a
          href={
            user && user.role === "Job Seeker" ? "/applications/me" : "/job/post"
          }
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Get Started
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      
      </div>
    </div>
  </div>
  
  );
};

export default HeroSection;
