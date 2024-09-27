import React, {useContext} from 'react'
import {Context} from '../../main'
import {Link} from 'react-router-dom'
import { FaLinkedin} from 'react-icons/fa'
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {

  const {isAuthorized} = useContext(Context)
  return (
    <footer className={`${isAuthorized ? "footerShow" : "footerHide"} bg-white rounded-lg shadow m-4 dark:bg-gray-800`}>
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Link to="#" className="hover:underline me-4 md:me-6">About</Link>
        </li>
        <li>
          <Link to="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
        </li>
        <li>
          <Link to="#" className="hover:underline me-4 md:me-6">Licensing</Link>
        </li>
        <li>
          <Link to="#" className="hover:underline">Contact</Link>
        </li>
      </ul>
    </div>
  </footer>
  
  )
}

export default Footer

