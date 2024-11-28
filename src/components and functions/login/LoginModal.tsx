import Modal from 'react-bootstrap/Modal';
import Login from './Login';
import { useUser } from '../../UserContext';


const LoginModal = ({ show, handleClose, handleSwitchToSignUp }) => {
  const { setUser } = useUser();
  
  const handleLogin = (user) => {
    setUser(user);
    handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
        <span className="close-icon" onClick={handleClose}>
          &times;
        </span>
      </Modal.Header>
      <Modal.Body>
        <Login onLogin={handleLogin} 
         handleSwitchToSignUp={handleSwitchToSignUp}/>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
