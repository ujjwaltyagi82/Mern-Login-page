import React, { useState } from "react";
import "./register.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()

  const [user, setuser] = useState({

    name: "",
    email: "",
    password: "",
    reEnterpass: ""

  })

  const handleChange = e => {
    const { name, value } = e.target
    setuser({
      ...user,
      [name]: value
    })

  }

  const register = () => {
    const { name, email, password, reEnterpass } = user

    if (name && email && password && (password === reEnterpass)) {
      axios.post("http://localhost:3001/register", user)
        .then(res => {alert(res.data.message)
          navigate("/login")
        })
    } else {
      alert("invalid input")
    }
  }

  return (
    <div className="register">
      {console.log("user", user)}
      <h1>Register</h1>
      <input type="text" name="name" value={user.name} placeholder="Enter your name" onChange={handleChange}></input>
      <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange}></input>
      <input type="password" name="password" value={user.password} placeholder="Your password" onChange={handleChange}></input>
      <input type="password" name="reEnterpass" value={user.reEnterpass} placeholder="confirm your passoword" onChange={handleChange}></input>
      <div className="button" onClick={register}>Register</div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>login</div>

    </div>

  )


}

export default Register;