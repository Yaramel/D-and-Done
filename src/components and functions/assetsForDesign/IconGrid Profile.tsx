import { Link } from 'react-router-dom';
import { GiScrollUnfurled, GiSpellBook, GiDwarfFace } from 'react-icons/gi';
import profImg from '../../assets/profile.png'; // ✅ caminho relativo
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

export default function IconGridProfile() {
  const { user } = useUser();
  const navigate = useNavigate();

  const goToSpells = () => {
    navigate('/spells', { state: { isHomebrew: true } });
  };

  return (
    <div
      className="even-section"
      style={{
        backgroundImage: `url(${profImg})`,
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '50px 0',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 mb-4">
            <h2 className="p-3 text-center">
              As a {user[0].isMaster ? 'Master' : 'player'} here are your
              choices:
            </h2>
            <div className="row justify-content-center">
              {user[0].isMaster && (
                <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
                  <div className="p-3 text-center grid-item">
                    <Link
                      to="/homebrew_creation/rules"
                      className="grid-item custom-link"
                    >
                      <GiScrollUnfurled size={40} />
                      <div>New Rule</div>
                    </Link>
                  </div>
                </div>
              )}

              {user[0].isMaster && (
                <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
                  <div className="p-3 text-center grid-item">
                    {user && user[0].isMaster && (
                      <Link
                        to="/homebrew_creation/spells"
                        className="grid-item custom-link"
                      >
                        <GiSpellBook size={40} />
                        <div>New Spell</div>
                      </Link>
                    )}
                    {(!user || (user && !user[0].isMaster)) && (
                      <div onClick={goToSpells} className="grid-item custom-link">
                        <GiSpellBook size={40} />
                        <div>Spell</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!user[0].isMaster && (
                <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
                  <div className="p-3 text-center grid-item">
                    <Link to="/characters" className="grid-item custom-link">
                      <GiDwarfFace size={40} />
                      <div>Your Characters</div>
                    </Link>
                  </div>
                </div>
              )}

              <div className="col-lg-2 col-md-2 col-sm-6 mb-4">
                <div className="p-3 text-center grid-item">
                  <Link to="/campaigns" className="grid-item custom-link">
                    <GiSpellBook size={40} />
                    <div>Your Campaigns</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
