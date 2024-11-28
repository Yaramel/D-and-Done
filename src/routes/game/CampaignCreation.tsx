import { useEffect } from 'react';
import CampaignCreate from '../../components and functions/campaigns/CampaignCreate';
import { useUser } from '../../UserContext'; // Import useUser

export default function CampaignCreationPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    const { user } = useUser();
    if (!user) {
        return (
            <div className='even-section'>
                <p>Please log in to create a campaign.</p>
            </div>
        );
    }

    return (
        <>
            <header>
                <CampaignCreate />
            </header>
        </>
    );
}
