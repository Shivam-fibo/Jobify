
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { TbNavigationExclamation } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../main'

const Jobs = () => {
  const[jobs, setJobs] = useState([])
  const {isAuthorized} = useContext(Context)
  const navigate = useNavigate();
  useEffect(() =>{
    try {
      axios.get("http://localhost:4000/api/v1/job/getall",{withCredentials: true} )
      .then((res) =>{
        setJobs(res.data);
      })
    } catch (error) {
        console.log(error);
    }
  }, []);

  if(!isAuthorized){
    navigateTo("/login");
  }
  return (
    <div className="container mx-auto p-4">
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold">All Available Jobs</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.jobs &&
        jobs.jobs.map((element) => {
          return (
            <div
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
              key={element._id}
            >
              <p className="text-lg font-semibold mb-2">{element.title}</p>
              <p className="text-gray-700 mb-1">{element.category}</p>
              <p className="text-gray-500 mb-4">{element.country}</p>
              <Link
                to={`/job/${element._id}`}
                className="inline-flex items-center justify-center py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
              >
                Job Details
              </Link>
            </div>
          );
        })}
    </div>
  </div>
  
  )
}

export default Jobs
