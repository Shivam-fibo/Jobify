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
    <div className="container mx-auto h-screen px-4 py-8">
    <div className="flex flex-wrap">
      {/* Left section */}
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between items-center">
            <div className="text-4xl font-bold">
              Jobify<span className="text-green-700">.</span>
            </div>
            <div>
           
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
                {user && user.role === "Job Seeker"
                  ? "Find your "
                  : "Streamline your "} 
                <span className="text-green-700">
                  {user && user.role === "Job Seeker"
                    ? "Dream Job"
                    : "Hiring Process"}
                </span>
              </h1>
              <div className="w-20 h-2 bg-green-700 my-4"></div>
              <p className="text-xl mb-10">
                {user && user.role === "Job Seeker"
                  ? "Search and apply for your dream job, manage applications, and track your progress all in one place."
                  : "Post job listings, manage applications, and streamline the hiring process with our job portal designed for employers."}
              </p>
              <a
                href={user && user.role === "Job Seeker" ? "/applications/me" : "/job/post"}
                className="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow hover:bg-green-600 transition duration-200"
              >
                Get Started
              </a>
            </div>
          </header>
        </div>
      </div>
  
      {/* Right section */}
      <img
        src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="Leafs"
        className="w-full h-24 object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  </div>
  
  );
};

export default HeroSection;
