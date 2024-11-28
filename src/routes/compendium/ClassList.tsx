import { useEffect } from "react";
import BreadcrumbNav from "../../components and functions/assetsForDesign/BreabcrumbNav.tsx";
import ClassListSearch from '../../components and functions/compendium/classes/ClassListSearch.tsx';

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
                        <h1 className="container titleText"> Classes</h1>
                    </div>
                </li>
            </ul>
            <ClassListSearch />
        </div>
    );

}

