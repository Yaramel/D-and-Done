// import { Breadcrumb } from 'react-bootstrap'; //npm install react-bootstrap bootstrap
import { useState, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { ConfirmationPopUp } from './DDoneConfirmation'; // Adjust the import path as needed
import { useUser } from '../../UserContext'; // Import the context hook


export default function BreadcrumbNav() {
    const { user } = useUser(); // Use the context directly
    const location = useLocation();
    const paths = location.pathname.split('/').filter(path => path !== ''); // Split pathname and remove empty segments
    const names = paths.map(path => path.charAt(0).toUpperCase() + path.slice(1)); // Capitalize first letter of each segment

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [targetPath, setTargetPath] = useState('');

    const pathsRequiringConfirmation = ['/homebrew_creation/rules', '/homebrew_creation/spells', '/characters/creation', '/campaigns/creation'];

    const handleClick = (event: MouseEvent, index: number, path: string) => {
        // console.log("aqui")
        if (index === paths.length - 1) {
            event.preventDefault(); // Prevent default behavior of the link
        } else if (pathsRequiringConfirmation.includes(location.pathname) && user) {
            event.preventDefault();
            setTargetPath(`/${path}`);
            setShowConfirmation(true);
        }
    };

    const handleConfirmNavigation = () => {
        setShowConfirmation(false);
        window.location.href = targetPath;
    };

    const handleCancelNavigation = () => {
        setShowConfirmation(false);
        setTargetPath('');
    };

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'transparent' }}>
                    <li className="breadcrumb-item"><a href="/" >Compendium</a></li>
                    
                    {paths.map((path, index) => (
                        <li key={index + 1} className={`breadcrumb-item ${index === paths.length - 1 ? 'active' : ''}`} aria-current={index === paths.length - 1 ? 'page' : undefined}>
                            <a href={index === paths.length - 1 ? "#" : `/${path}`} onClick={(event) => handleClick(event, index, path)}>{names[index]}</a>
                        </li>
                    ))}
                </ol>
            </nav>

            {showConfirmation && (
                <ConfirmationPopUp
                    message="You have unsaved changes, are you sure you want to leave?"
                    onConfirm={handleConfirmNavigation}
                    onCancel={handleCancelNavigation}
                />
            )}
        </div>
    );
}



// interface inputs {

//     spellData: JSON;

// }

// export default function BreadcrumbNav({ spellData }: inputs) {

//     return (
//         <div className="container ">
//             <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                     <li className="breadcrumb-item"><a href="/">Compendium</a></li>
//                     <li className="breadcrumb-item"><a href="/spell">Spell</a></li>
//                     <li className="breadcrumb-item active" aria-current="page">{spellData.name}</li>
//                 </ol>
//             </nav>
//         </div>
//     );
// }

