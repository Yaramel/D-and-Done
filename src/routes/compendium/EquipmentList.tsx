import EquipmentListSearch from '../../components and functions/compendium/equipments/EquipmentListSearch.tsx';
import BreadcrumbNav from "../../components and functions/assetsForDesign/BreabcrumbNav.tsx";
import { useEffect } from 'react';

export default function EquipmentList() {
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
                        <h1 className="container titleText">Equipment List</h1>
                    </div>
                </li>
            </ul>
            <EquipmentListSearch />
        </div>
    );

}

