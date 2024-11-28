import { useState } from 'react';
import DDoneDropdown from '../assetsForDesign/DDoneDropdown.tsx';
import DDoneButton from '../assetsForDesign/DDoneButton.tsx';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { postUserInfo } from "./loginLogic.tsx";

const SignUp = ({ handleSwitchToLogin }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [isMaster, setIsMaster] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false); // State for tracking signup success
  const [errorMessage, setErrorMessage] = useState(''); // State for holding error message

  const handleSignUp = async () => {
    try {
      await postUserInfo(username, password, email, isMaster);
      setSignupSuccess(true); // Setting signup success state to true
      setErrorMessage(''); // Resetting error message if signup is successful
      setTimeout(handleSwitchToLogin, 1000); // Delay of 3 seconds before switching to login modal
    } catch (error) {
      // Handle error if signup fails
      console.log(error.toString().split(" || ")[1]);
      if (error.toString().split(" || ")[1] == "400") {
        setErrorMessage('Username or Email already used');
      } else if (error && error.toString().split(" || ")[1] == "404") {
        setErrorMessage('Failed to Connect to the Database');
      } else {
        setErrorMessage('Unknown Error');
      }
      setSignupSuccess(false); // Setting signup success state to false
    }
  };

  const handleSelectRole = (role) => {
    setRole(role);
    if (role === "GameMaster") setIsMaster(true);
  };

  return (
    <div className="login-form">
      {signupSuccess && ( // Render the alert if signup success state is true
        <div className="alert alert-success">
          Signup successful!
        </div>
      )}
      {errorMessage && ( // Render the alert if there's an error message
        <div className="alert alert-danger">
          {errorMessage}
        </div>
      )}

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" style={{ color: "#1d1d1d" }}><FaUser /></span>
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
          <span className="input-group-text" style={{ color: "#1d1d1d" }}><FaLock /></span>
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

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" style={{ color: "#1d1d1d" }}><FaEnvelope /></span>
        </div>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="d-flex justify-content-center mb-3">
        <div className="text-center">
          <p>What is your main role?</p>
          <DDoneDropdown
            width="150px"
            value={role || 'Player'}
            onChange={(value) => handleSelectRole(value)}
            options={['Player', 'GameMaster']}
          />
        </div>
      </div>

      <br />

      <DDoneButton
        width="100%"
        height={2}
        onClick={() => handleSignUp()}
        text="Sign Up"
      />

      <hr className="my-5 separator" style={{ borderWidth: "3px" }} />

      <div className="text-center mt-3">
        <p>
          Already have an account?{' '}
          <a className='clickable' onClick={handleSwitchToLogin}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
