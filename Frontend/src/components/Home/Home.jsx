import React from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import HeroSection from "./HeroSection"

const Home = () => {
  const {isAuthorized} = useContext(Context)
  if(!isAuthorized){
    return <Navigate to = {"/login"} />
  }
  return (
    <section className='homePage page'>
      <HeroSection/>
    </section>
  )
}

export default Home
