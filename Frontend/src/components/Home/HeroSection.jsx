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
        <h2 className="text-3xl font-bold mb-4">
          {user && user.role === "Job Seeker"
            ? "Find Your Dream Job"
            : "Streamline Your Hiring Process"}
        </h2>

        <p className="text-lg mb-6">
          {user && user.role === "Job Seeker"
            ? "Search and apply for your dream job, manage applications, and track your progress all in one place."
            : "Post job listings, manage applications, and streamline the hiring process with our job portal designed for employers."}
        </p>

        <a
          href={
            user && user.role === "Job Seeker" ? "/applications/me" : "/job/pos"
          }
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md shadow hover:bg-blue-600 transition duration-200"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
