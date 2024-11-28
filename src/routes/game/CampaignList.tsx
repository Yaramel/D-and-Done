import { useEffect } from 'react';
import { useUser } from '../../UserContext';
import BreadcrumbNav from "../../components and functions/assetsForDesign/BreabcrumbNav";
import CampaignListSearch from '../../components and functions/campaigns/CampaignListSearch';


export default function CampaignList() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
    const { user } = useUser();
    if (!user) {
      return (
        <div className='even-section'>
          <p>Please log in to see the Campaigns.</p>
        </div>
      );
    }
      
    return (
      <div className='even-section'>
        <ul className="custom-list">
          <li >
            <BreadcrumbNav />
            <br />
  
            <div className="container">
              <h1 className="container titleText"> Your Campaigns</h1>
            </div>
          </li>
        </ul>
        <CampaignListSearch isYours={true}/>
      </div>
    );
}
