import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType == "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    await axios.post(
      "http://localhost:4000/api/v1/job/post",
      fixedSalary.length >= 4
        ? {title, category, description, city, location, fixedSalary, description}
        : {title, category, description, city, location, salaryFrom, salaryTo, description},{
          withCredentials:true,
          headers: {
            "Content-Type":"application/json"
          }
        }
    ).then((res) => toast.success(res.data.message))
    .catch((error) => toast.error(error.response.data.message))
  };

  const navigateTo = useNavigate()
  if(!isAuthorized || (user && user.role !== "Employer")){
    navigateTo("/")
  }
  return <>
      <div className="job_post page">
        <div className="container">
            <h3>POST NEW JOB</h3>
            <form onSubmit={handleJobPost}>
              <div className="wrapper">
              <input 
              type="text"
              value={title}
              onChange= {(e) => setTitle(e.target.value)}
              placeholder = "Job Title"
              
              />
              <select  value={category} onChange= {(e) => setCategory(e.target.value)}>

          <option value=""> Select Category </option>
          <option value="Mobile App Development">Mobile App Development</option>

      <option value="Frontend Web Developement">Frontend Web Development</option>

      <option value="MERN Stack Development">MERN STACK Web Develomennt</option>     
              </select>
              </div>
              <div className="wrapper">
              <input 
              type="text"
              value={country}
              onChange= {(e) => setCountry(e.target.value)}
              placeholder = "country"
              
              />  
               <input 
              type="text"
              value={city}
              onChange= {(e) => setCity(e.target.value)}
              placeholder = "country"
              
              />  
              </div>
              <input 
              type="text"
              value={location}
              onChange= {(e) => setLocation(e.target.value)}
              placeholder = "Location"
              
              /> 
              <div className="salary_wrapper">
                <select value={salaryType} onChange= {(e) => setSalaryType(e.target.value)}>
                  <option value="default">Select Salary Type</option>
                  <option value="Fixed Salary">Fixed Salary</option>
                  <option value="Ranged Salary">Ranged Salary</option>
                </select>
                <div>
                  {
                    salaryType === "defalut" ? (<p>Please Provide Salary Type</p>) : (
                      salaryType === "Fixed Salary" ? (<input type="number" placeholder = "Enter Fixed Salary" value = {fixedSalary} onchange= {(e) => setFixedSalary(e.target.value)}/>) : (
                        <div className="ranged_salary">
                            <input type="number" placeholder="Salary From" value={salaryFrom} onChange= {(e) => setSalaryFrom(e.target.value)} />
                            <input type="number" placeholder="Salary To" value={salaryTo} onChange= {(e) => setSalaryTo(e.target.value)} />

                        </div>
                      )
                      
                    )}
                  
                </div>
              </div>

              <textarea rows="10" value={description} onChange = {(e) => setDescription(e.target.value)} placeholder = "Description"/>
              <button type="submit">Create Job</button>
            </form>
        </div>
      </div>


  </>;
};

export default PostJob;
