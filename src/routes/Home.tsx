/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import DDoneButton from '../components and functions/assetsForDesign/DDoneButton';
import IconGrid from '../components and functions/assetsForDesign/IconGrid';
import IconGridHomebrew from '../components and functions/assetsForDesign/IconGridHomebrew';
import LoginModal from '../components and functions/login/LoginModal';
import SignUpModal from '../components and functions/login/SignUpModal';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

// importa imagens
const miscImages = import.meta.glob("/src/assets/*.{png,jpg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function Header({ isLogged, isMaster }: { isLogged: boolean; isMaster: boolean }) {
  const navigate = useNavigate();
  const goToCamp = () => {
    navigate('/campaigns');
  };
  const goToChar = () => {
    navigate('/characters');
  };
  const goToHomebrew = () => {
    navigate('/homebrew_creation');
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSwitchToSignUp = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  const headerImg = miscImages["/src/assets/header.png"];

  return (
    <>
      <header
        className="title"
        style={{
          backgroundImage: `url(${headerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '50px 0',
        }}
      >
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="container">
              <h1>Welcome to the D&Done Compendium</h1>
              <br />
              {!isLogged && (
                <>
                  <h6>Browse for any D&D related info!</h6>
                  <h6>Or</h6>
                  <h6>Login and get ready to begin your adventure!</h6>
                  <br />
                  <DDoneButton
                    width="150px"
                    height={2}
                    onClick={() => setShowLoginModal(true)}
                    text="Login"
                  />
                </>
              )}

              {isLogged && isMaster && (
                <>
                  <div className="row justify-content-center">
                    <div className="col-lg-1 col-md-4 col-sm-6 mb-4">
                      <DDoneButton
                        width="150px"
                        height={2}
                        onClick={() => goToCamp()}
                        text="Your Campaigns"
                      />
                    </div>
                    <div className="col-lg-1 col-md-4 col-sm-6 mb-4"></div>
                    <DDoneButton
                      width="150px"
                      height={2}
                      onClick={() => goToHomebrew()}
                      text="New Homebrew"
                    />
                  </div>
                </>
              )}

              {isLogged && !isMaster && (
                <>
                  <div className="row justify-content-center">
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
                      <DDoneButton
                        width="150px"
                        height={2}
                        onClick={() => goToChar()}
                        text="Your Characters"
                      />
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
                      <DDoneButton
                        width="150px"
                        height={2}
                        onClick={() => goToCamp()}
                        text="Your Campaigns"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
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
    </>
  );
}

export default function Home() {
  const { user } = useUser();

  const [isMaster, setMaster] = useState(false);
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    if (user) setLogged(true);
  }, [user]);

  useEffect(() => {
    const isMaster = (user as any)?.isMaster ? true : false;
    if (isMaster) {
      setMaster(isMaster);
    }
  }, [user]);

  return (
    <>
      <Header isLogged={isLogged} isMaster={isMaster} />
      <IconGrid />
      <IconGridHomebrew />
    </>
  );
}
