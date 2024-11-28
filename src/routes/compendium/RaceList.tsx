import { useEffect } from "react";
import BreadcrumbNav from "../../components and functions/assetsForDesign/BreabcrumbNav.tsx";
import RaceListSearch from '../../components and functions/compendium/races/RaceListSearch.tsx';

export default function EquipmentList() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      

    return (
        <div className='even-section'>


            <ul className="custom-list">
                <BreadcrumbNav />
                <br />
                <li >
                    <div className="container">
                        <h1 className="container titleText"> Race List</h1>
                    </div>
                </li>
            </ul>
            <RaceListSearch />
        </div>
    );

}

