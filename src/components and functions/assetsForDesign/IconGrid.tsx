import { Link } from 'react-router-dom';
import {
  GiScrollUnfurled,
  GiSpellBook,
  GiZeusSword,
  GiSwordsEmblem,
  GiMagicAxe,
  GiDwarfFace,
} from 'react-icons/gi';
import libImg from '../../assets/lib.png'; // ✅ corrigido

export default function IconGrid() {
  return (
    <div
      className="even-section"
      style={{
        backgroundImage: `url(${libImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '50px 0',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
            <h2 className="p-3 text-center">Compendium</h2>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                <div className="p-3 text-center grid-item">
                  <Link to="/class" className="grid-item custom-link">
                    <GiZeusSword size={40} />
                    <div>Classes</div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                <div className="p-3 text-center grid-item">
                  <Link to="/magic_item" className="grid-item custom-link">
                    <GiMagicAxe size={40} />
                    <div>Magic Items</div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                <div className="p-3 text-center grid-item">
                  <Link to="/equipment" className="grid-item custom-link">
                    <GiSwordsEmblem size={40} />
                    <div>Equipments</div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                <div className="p-3 text-center grid-item">
                  <Link to="/race" className="grid-item custom-link">
                    <GiDwarfFace size={40} />
                    <div>Races</div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                <div className="p-3 text-center grid-item">
                  <Link to="/rules" className="grid-item custom-link">
                    <GiScrollUnfurled size={40} />
                    <div>Rules</div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                <div className="p-3 text-center grid-item">
                  <Link to="/spells" className="grid-item custom-link">
                    <GiSpellBook size={40} />
                    <div>Spells</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-1 col-md-12 d-flex align-items-center justify-content-center"></div>

          <div className="col-lg-4 col-md-12 d-flex align-items-center justify-content-center">
            {/* <img alt="Books" title="" src={booksImg} className="img-fluid" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
