import { useEffect } from "react";
import BreadcrumbNav from "../../components and functions/assetsForDesign/BreabcrumbNav.tsx";
import MagicItemListSearch from '../../components and functions/compendium/magicItems/MagicItemListSearch.tsx';

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
                        <h1 className="container titleText"> Magic Item List</h1>
                    </div>
                </li>
            </ul>
            <MagicItemListSearch />
        </div>
    );

}

