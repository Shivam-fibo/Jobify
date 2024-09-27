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
     <div className="container mx-auto p-4 mt-4 md:p-8">
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-2xl font-bold mb-4">Job Details</h3>
    <p className="text-lg mb-2">
      Title: <span className="font-semibold">{job.title}</span>
    </p>
    <p className="text-lg mb-2">
      Category: <span className="font-semibold">{job.category}</span>
    </p>
    <p className="text-lg mb-2">
      City: <span className="font-semibold">{job.city}</span>
    </p>
    <p className="text-lg mb-2">
      Location: <span className="font-semibold">{job.location}</span>
    </p>
    <p className="text-lg mb-2">
      Description: <span className="font-semibold">{job.description}</span>
    </p>
    <p className="text-lg mb-2">
      Job Posted On: <span className="font-semibold">{job.jobPostedOn}</span>
    </p>
    <p className="text-lg mb-4">
      Salary:{" "}
      {job.fixedSalary ? (
        <span className="font-semibold">{job.fixedSalary}</span>
      ) : (
        <span className="font-semibold">
          {job.salaryFrom} - {job.salaryTo}
        </span>
      )}
    </p>
    <p>
      {user && user.role === "Employer" ? null : (
        <Link
          to={`/application/${job._id}`}
          className="inline-flex items-center justify-center py-2 px-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
        >
          Apply Now
        </Link>
      )}
    </p>
  </div>
</div>

    </>
  )
}

export default JobDetails
