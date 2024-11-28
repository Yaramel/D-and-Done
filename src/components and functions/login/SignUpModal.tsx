import Modal from 'react-bootstrap/Modal';
import SignUp from './SignUp';
import { useUser } from '../../UserContext';

const SignUpModal = ({ show, handleClose, handleSwitchToLogin }) => {
  const { setUser } = useUser(); // Use the context directly

  const handleSignup = (userData) => {
    setUser(userData);
    handleClose();
    handleSwitchToLogin(); // Call the switch to login modal
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header >
        <Modal.Title>Sign Up</Modal.Title>
        <span className="close-icon" onClick={handleClose}>
          &times;
        </span>
      </Modal.Header>
      <Modal.Body>
        <SignUp onSignUp={handleSignup} handleSwitchToLogin={handleSwitchToLogin} />
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
