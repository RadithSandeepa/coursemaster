import "./login.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
      setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));
  }

  const handleLogin = async (e) => {
     e.preventDefault();

     if (!credentials.email || !credentials.email.trim()) {
      toast.error('Email is required!');
      return;
    }

    if (!credentials.password || !credentials.password.trim()) {
      toast.error('Password is required!');
      return;
    }

     dispatch({type: "LOGIN_START"});
     try{
        const res = await axios.post("/auth/login", credentials);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        localStorage.setItem('tokenExpiration', res.data.expirationTime);
        
        const userRole = res.data.role; 
        if (userRole !== 'A' && userRole !== 'F') {
            toast.error('Access denied!');
            return;
        }

        if (userRole === 'A') {
          navigate("/");
        } else if (userRole === 'F') {
          navigate("/courses/mycourses");
      }
     }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
     }
  };

  useEffect(() => {
    console.log(error);
    if (error) {
      if (error.status === 404) {
        toast.error(error.message);
      } else {
        toast.error('Oops! Something went wrong.');
      }
    }
  }, [error]);
  
 
  
  //UNDERSTAND EACH TASKS
  //COUNT BY COURSE STUFF and change the homepage
  //CREATE AND READ UPDATE
  //FAUCLTY SIDE
  //ADMIN CANT ENTERRPUT FACULTY NEITHER FAUCLTY CANT ACCESS ADMIN LINKS
  //ADD NOTIFICATIONS TO PROFILE
  //RESPONSIVE

  return (
    <div className="login">
       <Toaster 
          position="bottom-right" 
          toastOptions={{ 
            style: { 
              minWidth: '400px',
              padding: '25px', // Adjust padding as needed
              background: '#fcf5f3'
            } 
          }} 
        />
        <div className="loginContainer">
          <h1>Sign In</h1>
            <form className="loginForm">
                <input type="text" placeholder="E-mail" id="email" onChange={handleChange}/>
                <input type="password" placeholder="Password" id="password" onChange={handleChange}/>
                <button disabled={loading} className="loginButton" onClick={handleLogin}>Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default Login;