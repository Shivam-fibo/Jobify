import React from 'react'
import { useState } from 'react'
import { Context } from '../../main'

const Register = () => {
  const [email, setEmail] = useState("")

  const  [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");

  const [name, setName] = useState("");

  const[role, setRole] = useState("")


  const {isAuthorized,SetIstAuthorized,user} = useContext(Context)


  const handleRegister = async(e) =>{
    e.prevetDefalut();
    try {
      const {data} = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        {
          name, email,  password, phone, role
        },
        {
          withCredentials: true,
          headers:{
            "Content-Type":"application/json"
          },
        }
      );
      toast.success(data.message)
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      SetIstAuthorized
    } catch (error) {
      
    }
  }
  return (
    <div>
      
    </div>
  )
}

export default Register
