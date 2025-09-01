/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { FaDiceD20 } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import LoginModal from '../login/LoginModal';
import SignUpModal from '../login/SignUpModal';
import { useUser } from '../../UserContext'; // Import the context hook
import { ConfirmationPopUp } from './DDoneConfirmation'; // Import the ConfirmationPopUp component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '/src/assets/logo.png';

export default function Navbar() {
    const { user, setUser } = useUser(); // Use the context directly
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [targetPath, setTargetPath] = useState('');

    const pathsRequiringConfirmation = ['/homebrew_creation/rules', '/homebrew_creation/spells', '/characters/creation', '/campaigns/creation'];

    const handleLogout = () => {
        setUser(null);
        window.location.href = '/';
    };

    const handleSwitchToSignUp = () => {
        setShowLoginModal(false);
        setShowSignUpModal(true);
    };

    const handleSwitchToLogin = () => {
        setShowSignUpModal(false);
        setShowLoginModal(true);
    };

    const handleProfile = () => {
        window.location.href = '/profile';
    };

    const handleNavClick = (path) => {
        if (pathsRequiringConfirmation.includes(window.location.pathname) && user) {
            setTargetPath(path);
            setShowConfirmation(true);
        } else {
            window.location.href = path;
        }
    };

    const handleConfirmNavigation = () => {
        setShowConfirmation(false);
        window.location.href = targetPath;
    };

    const handleCancelNavigation = () => {
        setShowConfirmation(false);
        setTargetPath('');
    };

    const currentPath = window.location.pathname;

    return (
        <>
            <header>
                <nav className="navbar navbar-custom navbar-expand-lg container">
                    <div className="container-fluid">
                        <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand px-5" href="/" onClick={(e) => {e.preventDefault(); handleNavClick('/');}}>
                            <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" />
                        </a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className={currentPath === '/' ? "nav-link active" : "nav-link"} aria-current="page" href="/" onClick={(e) => {e.preventDefault(); handleNavClick('/');}}>Compendium</a>
                                </li>
                                <li className="nav-item">
                                    <a className={currentPath === "/profile" ? "nav-link active" : "nav-link"} href="/profile" onClick={(e) => {e.preventDefault(); handleNavClick('/profile');}}>Profile</a>
                                </li>
                                {/* {user?.length >= 0 && !user[0].isMaster && ( */}
                                {(user as any)?.length >= 0 && !(user as any).isMaster && (
                                    <li className="nav-item">
                                        <a className={currentPath === "/characters" ? "nav-link active" : "nav-link"} href="/characters" onClick={(e) => {e.preventDefault(); handleNavClick('/characters');}}>My Characters</a>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <a className={currentPath === "/campaigns/lobby" ? "nav-link active" : "nav-link"} href="/campaigns/lobby" onClick={(e) => {e.preventDefault(); handleNavClick('/campaigns/lobby');}}>Campaigns Lobby</a>
                                </li>
                                {user && (
                                    <li className="nav-item">
                                        <a className={currentPath === "/campaigns" ? "nav-link active" : "nav-link"} href="/campaigns" onClick={(e) => {e.preventDefault(); handleNavClick('/campaigns');}}>My Campaigns</a>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="navbar-text">
                            {user ? (
                                <Dropdown className="navbar-dropdown">
                                    <Dropdown.Toggle as="div" className="circle-icon" role="button" aria-haspopup="true" aria-expanded="false">
                                        <span style={{ color: "black", fontSize: "32px", fontWeight: "700" }}>
                                            {user[0].username.charAt(0).toUpperCase()}
                                        </span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <div className="circle-icon" onClick={() => setShowLoginModal(true)}>
                                    <FaDiceD20 className="login-icon" size={40} />
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <LoginModal
                show={showLoginModal}
                handleClose={() => setShowLoginModal(false)}
                handleSwitchToSignUp={handleSwitchToSignUp}
            />

            <SignUpModal
                show={showSignUpModal}
                handleClose={() => setShowSignUpModal(false)}
                handleSwitchToLogin={handleSwitchToLogin}
            />

            {showConfirmation && (
                <ConfirmationPopUp
                    message="You have unsaved changes, are you sure you want to leave?"
                    onConfirm={handleConfirmNavigation}
                    onCancel={handleCancelNavigation}
                />
            )}
        </>
    );
}
