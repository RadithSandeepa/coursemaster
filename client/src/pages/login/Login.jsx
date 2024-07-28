import "./login.scss";
import Lottie from 'lottie-react';
import animationData from "../../assets/Login.json";

function Login() {
  return (
    <div className="login">
        <div className="loginContainer">
          <div className="wrapper">
          <h1>Sign In</h1>
            <form className="loginForm">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button className="loginButton">Sign In</button>
            </form>
          </div>
        </div>
        <div className="imgContainer">
          <Lottie animationData={animationData} />
        </div>
    </div>
  )
}

export default Login;