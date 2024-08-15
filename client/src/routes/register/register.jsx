import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [errors, setErrors] = useState()
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    // activate isLoading
    setIsLoading(true)
    //recieve data
     e.preventDefault()
     const formData =new FormData(e.target)
     const username = formData.get("username")
     const email = formData.get("email")
     const password = formData.get("password")
    // post data
    try {
       const res = await apiRequest.post("/auth/register", {
         username,
         email,
         password,
       });
      console.log(res);
      
      navigate('/login')
    } catch (error) {
      console.log(error.response.data.message);
      setErrors(error.response.data.message)
      
    }
    finally {
      setIsLoading(false)
    }
  
   };
  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading} >Register</button>
          {errors && <span>{ errors}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
