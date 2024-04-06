import React from "react";
import CountUp from 'react-countup';
import { TypeAnimation } from 'react-type-animation';
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: <CountUp end = {10} duration = {2}/>,
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: <CountUp end = {100} duration = {2}/>,
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: <CountUp end = {250} duration = {2}/>,
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: <CountUp end = {300} duration = {2}/>,
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
          <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'Find a job that suits your interests',
    1000,
    'Find a job that suits your skill',
    1000,
    'Find a job that suits your location',
    1000,
    'Find a job that suits your passion',
    1000,
    'Find a job that suits your expertise',
    1000,
   'Find a job that suits your qualifications',
    1000,
    
  ]}
  speed={50}
  style={{ fontSize: '2em' }}
  repeat={Infinity}
/>
         
            <p>
            Discover a realm of career prospects through our all-encompassing job portal, where your next significant opportunity lies. Engage with leading companies and advance your professional journey today.
            </p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;