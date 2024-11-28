import RuleListSearch from '../../components and functions/compendium/rules/RuleListSearch.tsx';
import BreadcrumbNav from "../../components and functions/assetsForDesign/BreabcrumbNav.tsx";
import { useEffect } from 'react';

export default function RuleList() {
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
                        <h1 className="container titleText"> Rule List</h1>
                    </div>
                </li>
            </ul>
            <RuleListSearch />
        </div>
    );

}

