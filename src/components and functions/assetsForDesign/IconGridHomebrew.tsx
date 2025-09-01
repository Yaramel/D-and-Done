import { Link } from 'react-router-dom';
import { GiScrollUnfurled, GiSpellBook, GiSwordsEmblem, GiMagicAxe } from 'react-icons/gi';
// import HBImg from '/src/assets/hb.png';
import forgImg from '/src/assets/forg.png';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';



export default function IconGridHomebrew() {
    const navigate = useNavigate();
    const goToSpells = () => {
        navigate('/spells', { state: { isHomebrew: true } });
    };

    const { user } = useUser(); // Access user from context
    return (
        <div className="even-section" style={{ backgroundImage: `url(${forgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '50px 0' }}>
            <div className="container">
                <div className="row">

                    <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center">
                        {/* <img alt="Alchemy Set" title="" src={HBImg} className="img-fluid" /> */}
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4">
                        <h2 className="p-3 text-center">Homebrew</h2>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                                <div className="p-3 text-center grid-item">
                                    <Link to="/homebrew_creation/magic_item" className="grid-item custom-link">
                                        <GiMagicAxe size={40} />
                                        <div>Magic Items</div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                                <div className="p-3 text-center grid-item">
                                    <Link to="/homebrew_creation/equipment" className="grid-item custom-link">
                                        <GiSwordsEmblem size={40} />
                                        <div>Equipments</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                                {user && user[0].isMaster && <div className="p-3 text-center grid-item">
                                    <Link to="/homebrew_creation/rules" className="grid-item custom-link">
                                        <GiScrollUnfurled size={40} />
                                        <div>Rules</div>
                                    </Link>
                                </div>}
                                {(!user || (user && !user[0].isMaster)) && <div className="p-3 text-center grid-item">
                                    <Link to="/rules" className="grid-item custom-link">
                                        <GiScrollUnfurled size={40} />
                                        <div>Rules</div>
                                    </Link>
                                </div>}
                            </div>


                            <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                                <div className="p-3 text-center grid-item">
                                    {user && user[0].isMaster && (
                                        <Link to="/homebrew_creation/spells" className="grid-item custom-link">
                                            <GiSpellBook size={40} />
                                            <div>Spells</div>
                                        </Link>
                                    )}
                                    {(!user || (user && !user[0].isMaster)) && (
                                        <div onClick={goToSpells} className="grid-item custom-link">
                                            <GiSpellBook size={40} />
                                            <div>Spells</div>
                                        </div>
                                    )}
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
