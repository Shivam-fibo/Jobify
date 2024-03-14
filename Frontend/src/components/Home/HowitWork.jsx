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
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, impedit.</p>
              </div>
              <div className="card">
                <MdFindInPage/>
                <p>Find a Job/ Post a Job</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, impedit.</p>
              </div>
              <div className="card">
              <LuSendHorizonal />
                <p>Create Account</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, impedit.</p>
              </div>
            </div>
      </div>
      
    </div>
  )
}

export default HowitWork
