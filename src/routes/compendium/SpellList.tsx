import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import SpellListSearch from '../../components and functions/compendium/spells/SpellListSearch.tsx';
import BreadcrumbNav from "../../components and functions/assetsForDesign/BreabcrumbNav.tsx";

export default function SpellList() {
    const location = useLocation(); // Get the current location
    const isHomebrew = location.state?.isHomebrew;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='even-section'>
            <ul className="custom-list">
                <li>
                    <BreadcrumbNav />
                    <br />
                    <div className="container">
                        <h1 className="container titleText">Spell List</h1>
                    </div>
                </li>
            </ul>
            <SpellListSearch isHomebrew={isHomebrew}/>
        </div>
    );
}
