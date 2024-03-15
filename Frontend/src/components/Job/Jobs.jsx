
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { TbNavigationExclamation } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
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
   <div className="jobs page">
    <div className="container">
      <h1>All Avilable Jobs</h1>
        <div className='banner'>
            {
              
            }
        </div>
    </div>
   </div>
  )
}

export default Jobs
