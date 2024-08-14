import React, {useContext} from "react";
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
    <>
      <div id="product-customization" className="container">
        <div id="text-center" className="text-center">
          <h2 id="section-title" className="section-title">
            Find the Job that suit you
          </h2>

          <p id="description" className="description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
            maiores ipsum eos temporibus ea nihil.
          </p>

          <a href="#" id="get-started-button" className="get-started-button" onClick={handleLogout}>
            Get Started
          </a>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
