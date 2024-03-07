import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {Context} from '../../main'

import axios from 'axios';



const NavBar = () => {

  const [show, setShow] = useState(false)
  const {isAuthorized,SetIstAuthorized,user} = useContext(Context)
  const navigateTo = useNavigate();

  const handleLogOut = async() =>{
      try {
        const response = await axios.get("https://localhost:4000/api/v1/user/logout", {withCredentials: true});
        toast.success(response.data.message);
        SetIstAuthorized(false);
        navigateTo('/login')
      } catch (error) {
        
      }
  }

  return (
    <div>
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className='container'>
        <div className="logo">
          {/* <img src={logo} alt="logo" /> */}
        </div>
        <ul className={!show ? "menu": "show-menu menu"}> 
      <li>
        <Link to={"/"} onClick={() => setShow(false)}>Home</Link>
      </li>

      <li>
        <Link to={"/job/getall"} onClick={() => setShow(false)}>All JOBS</Link>
      </li>

      <li>
        <Link to={"/application/me"} onClick={() => setShow(false)}>{user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}</Link>
      </li>
      {user && user.role === "Employer" ? (<>
      
      <li>
        <Link to={"/Job/post"} onClick={() => setShow(false)}>POST NEW JOB</Link>
      </li>

      <li>
        <Link to={"/job/me"} onClick={() => setShow(false)}>VIEW YOUR JOBS</Link>
      </li>
      </>) :(
        <>
        
        </>
      ) }
      <button onClick = {handleLogOut}>Logout</button>
        </ul>

      
      </div>
      </nav>
    </div>
  )
}

export default NavBar
