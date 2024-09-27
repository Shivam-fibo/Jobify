import React, { useContext } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
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
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };
  return (
    <div id="product-customization" className="container">
      <div id="text-center" className="text-center">
        <h2 id="section-title" className="section-title">
          {user && user.role === "Job Seeker"
            ? "Find Your Dream Job"
            : "Streamline Your Hiring Process"}
        </h2>

        <p id="description" className="description">
          {user && user.role === "Job Seeker"
            ? "Search and apply for your dream job, manage applications, and track your progress all in one place."
            : "Post job listings, manage applications, and streamline the hiring process with our job portal designed for employers."}
        </p>

        <a
          href={
            user && user.role === "Job Seeker" ? "/applications/me" : "/job/pos"
          }
          id="get-started-button"
          className="get-started-button"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
