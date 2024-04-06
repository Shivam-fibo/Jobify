import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { LuSendHorizonal } from "react-icons/lu";


const HowitWork = () => {
  return (
    <div className='howitworks'>
      <div className="container">
         <h3>How Jobify Work</h3>
            <div className="banner">
              <div className="card">
                <FaUserPlus/>
                <p>Create Account</p>
                  <p>Create an account using email id and phone number</p>
              </div>
              <div className="card">
                <MdFindInPage/>
                <p>Find a Job</p>
                  <p>Find the job which match with your skill</p>
              </div>
              <div className="card">
              <LuSendHorizonal />
                <p>Submit Application </p>
                  <p>Submit your job application with your basic info and resume</p>
              </div>
            </div>
      </div>
      
    </div>
  )
}

export default HowitWork
