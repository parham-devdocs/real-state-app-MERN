import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [errors, setErrors] = useState();
  const [isLoading,setIsLoading]=useState()
  const navigate = useNavigate();
  const {updateUser}=useContext(AuthContext)
  const handleSubmit = async (e) => {
    // acti vate loader
    setIsLoading(true)
    //recieve data
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    
    const password = formData.get("password");
    // post data
    
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password
      });
      console.log(res);
updateUser(res.data)      
    } catch (error) {
      console.log(error.response.data.message);
      setErrors(error.response.data.message);
    }
    finally {
      setIsLoading(false)
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            minLength={6}
            max={20}
            required
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {errors && <span>{errors}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
