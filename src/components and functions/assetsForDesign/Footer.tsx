import { useState, MouseEvent } from 'react';
import { ConfirmationPopUp } from './DDoneConfirmation'; // Import the ConfirmationPopUp component
import { useLocation } from 'react-router-dom';
import { useUser } from '../../UserContext'; // Import the context hook


export default function Footer() {
    const { user } = useUser(); // Use the context directly
    const location = useLocation();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [targetPath, setTargetPath] = useState('');

    const pathsRequiringConfirmation = ['/homebrew_creation/rules', '/homebrew_creation/spells', '/characters/creation', '/campaigns/creation'];

    const handleNavClick = (event: MouseEvent, path: string) => {
        if (pathsRequiringConfirmation.includes(location.pathname) && user) {
            event.preventDefault();
            setTargetPath(path);
            setShowConfirmation(true);
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

    return (
        <>
            <footer className="footer-custom text-center text-white">
                <div className="container">
                    <div className="row text-center d-flex justify-content-center pt-5">
                        <div className="col-md-2">
                            <h6 className="text-uppercase font-weight-bold">
                                <a href="/" className="custom-link" onClick={(e) => handleNavClick(e, '/')}>Compendium</a>
                            </h6>
                        </div>

                        <div className="col-md-2">
                            <h6 className="text-uppercase font-weight-bold">
                                <a href="/profile" className="custom-link" onClick={(e) => handleNavClick(e, '/profile')}>Profile</a>
                            </h6>
                        </div>

                        <div className="col-md-2">
                            <h6 className="text-uppercase font-weight-bold">
                                <a href="/campaign_lobby" className="custom-link" onClick={(e) => handleNavClick(e, '/campaign_lobby')}>Campaign Lobby</a>
                            </h6>
                        </div>
                    </div>

                    <hr className="my-5 separator" />

                    <section className="mb-1">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <p>
                                    Este website foi desenvolvido como um projeto da cadeira "Tecnologias para a Web e Ambientes Móveis" do curso de Engenharia Informática
                                    do Instituto Politécnico de Beja.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2024 by
                    <a> Raphael Jacuá & Yara de Souza</a>
                </div>
            </footer>

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
