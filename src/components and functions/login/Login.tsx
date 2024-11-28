/* eslint-disable @typescript-eslint/no-explicit-any */
// Login.js
import { useState } from 'react';
import { getUserInfo } from "./loginLogic.tsx";
import { FaUser, FaLock } from 'react-icons/fa';
import DDoneButton from '../assetsForDesign/DDoneButton.tsx';


const Login = ({ onLogin, handleSwitchToSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for holding error message

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userInfo = await getUserInfo(username);

      if (userInfo && userInfo.length !== 0 && userInfo[0].password === password) {
        onLogin(userInfo); // Assuming onLogin sets the user info in the parent component
        setErrorMessage(''); // Clear error message on successful login
        window.location.reload();
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Failed to connect to the server');
    }
  };



  return (
    <form onSubmit={handleLogin} className="login-form ">
      {errorMessage && (
        <div className="alert alert-danger">
          {errorMessage}
        </div>
      )}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" style={{color:"#1d1d1d"}}><FaUser /></span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" style={{color:"#1d1d1d"}}><FaLock /></span>
        </div>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-check mb-3">
        <input type="checkbox" className="form-check-input" id="rememberMe" />
        <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
      </div>

      <DDoneButton
        width="100%"
        height={2}
        onClick={(args:any) => handleLogin(args)}
        text="Login"
      />

      <hr className="my-5 separator" style={{ borderWidth: "3px" }} />

      <div className="text-center mt-3">
        <p>
          Don't have an account?{' '}
          <a className='clickable' onClick={handleSwitchToSignUp}>
            Sign Up
          </a>
          </p>
          <p><a className='clickable'>Forgot your password?</a></p>
      </div>
    </form>
  );
};

export default Login;
