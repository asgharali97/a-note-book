import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Navbar.css'

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  const {Showalert} = props

    e.preventDefault()
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
      Showalert(" Logged in successfully ", "success")
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
    <h2>Login to continue ANote Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name='password'  />
        </div>
        <button type="submit" className="btn btn-dark my-3">Submit</button>
      </form>
    </>
  )
}
export default Login



