
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
   <div className="jobs_page">
    <div className="job_container">
      <h1>All Avilable Jobs</h1>
        <div className='job_banner'>
            {
              jobs.jobs && jobs.jobs.map((element) =>{
                return(
                  <div className='job_card' key={element._id}> 
    <p>{element.title}</p>
    <p>{element.category}</p>
    <p>{element.country}</p>
    <Link to={`/job/${element._id}`}>Job Details</Link>
                  </div>
                )
              })
            }
        </div>
    </div>
   </div>
  )
}

export default Jobs
