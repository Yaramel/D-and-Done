import { useEffect } from 'react';
import BreadcrumbNav from "../../components and functions/assetsForDesign/BreabcrumbNav";
import CampaignListSearch from '../../components and functions/campaigns/CampaignListSearch';


export default function CampaignList() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

    return (
      <div className='even-section'>
        <ul className="custom-list">
          <li >
            <BreadcrumbNav />
            <br />
  
            <div className="container">
              <h1 className="container titleText"> Campaign Lobby</h1>
            </div>
          </li>
        </ul>
        <CampaignListSearch isYours={false}/>
      </div>
    );
}
