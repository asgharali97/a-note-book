import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Navbar.css'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" })
  const navigate = useNavigate();
  const {Showalert} = props

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name,email,password} = credentials
    const response = await fetch("http://localhost:4000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,email ,password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      console.log(json)
      navigate("/");
      Showalert(" Signed in successfully ", "success")

    }
    else {
      Showalert("Invalid credentials", "danger");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
    <h2>Signup to use  ANote Book Easily</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"name='name'onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email"name='email'onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name ='password'onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-dark">Submit</button>
</form>
    </>
  )
}

export default Signup
