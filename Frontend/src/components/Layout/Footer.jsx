import React, {useContext} from 'react'
import {Context} from '../../main'
import {Link} from 'react-router-dom'
import { FaLinkedin} from 'react-icons/fa'
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import './style.css'
const Footer = () => {

  const {isAuthorized} = useContext(Context)
  return (
   <footer className={isAuthorized ? "footerShow": "footerHide"}>
    <div> &copy; All right reseved by Shivam</div>
      <div>
        <Link to={'https://www.linkedin.com/in/shivamgupta6418/'} target= "_blank"><FaLinkedin/></Link>

        <Link to={'https://twitter.com/sg6418'} target= "_blank"><FaTwitter/></Link>

        <Link to={'https://github.com/Shivam-fibo'} target= "_blank"><FaGithub/></Link>

        <Link to={'https://shivam_gupta_6418'} target= "_blank"><FaInstagram/></Link>
      </div>
   </footer>
  )
}

export default Footer

