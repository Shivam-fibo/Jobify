import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Context} from '../../main'



const NavBar = () => {

  const [show, setShow] = useState(false)
  const {isAuthorized,} = useContext(Context)
  const navigateTo = useNavigate();

  const handleLogOut = async() =>{
    
  }

  return (
    <div>
      
    </div>
  )
}

export default NavBar
