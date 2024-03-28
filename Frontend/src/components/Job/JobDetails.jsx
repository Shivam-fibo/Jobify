import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import { Context } from '../../main';
const JobDetails = () => {

  const {id} = useParams();

  const [job, setJob] = useState({});

  const navigateTo = useNavigate();

  const {isAuthorized, user} = useContext(Context);
  
  useEffect(() =>{
      axios.get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      }).then(res =>{
        setJob(res.data.job)
      }).catch(err =>{
        console.log(err.response.data.json);
      })
  },[])

  if(!isAuthorized){
    navigateTo("/login")
  }
  return (
    <>
       <div className="jobDetail page">
          <div className="container">
              <h3>JOb Details</h3>
                <p>
                  Title: <span>{job.title}</span>
                </p>
                <p>
                  Category: <span>{job.category}</span>
                </p>
                <p>
                  City: <span>{job.city}</span>
                </p>
                <p>
                  Location: <span>{job.location}</span>
                </p>
                <p>
                  Description: <span>{job.description}</span>
                </p>
                <p>
                  Job Posted On: <span>{job.jobPostedOn}</span>
                </p>
                <p>
                  Salary : {job.fixedSalary ? (<span>{job.fixedSalaryn}</span>) : (<span>{job.salaryFrom} - {job.salaryTo}</span>)}
                </p>
                <p>
                  {
                    user && user.Role === "Employer" ? <> </> : 
                    <Link to={`/application/${job._id}`}>Apply Now</Link>
                  }
                </p>
          </div>
       </div>
    </>
  )
}

export default JobDetails
