// import { useState, useEffect } from 'react';
// import MagicItemInfoboard from '../../components/compendium/magicItems/MagicItemInfoboard';

// export default function MagicItemInfo() {
//     const currentPath = window.location.pathname.toLocaleLowerCase();
//     const magicItemPath = currentPath.replace("/magicItem/", "");

//     const [magicItemData, setMagicItemData] = useState(null);

//     useEffect(() => {
//         getMagicItemInfo(magicItemPath)
//             .then(magicItemData => {
//                 setMagicItemData(magicItemData);
//             })
//             .catch(error => {
//                 // Handle errors
//                 console.error(error);
//             });
//     }, [currentPath, magicItemPath]); // Trigger effect when currentPath or magicItemPath changes

//     return (
//         <>
//             <header>
//                 {magicItemData && <MagicItemInfoboard magicItemData={magicItemData} />}
//             </header>
//         </>
//     );
// }

// export function getMagicItemInfo(magicItemIndex: string) {
//     return fetch(`https://www.dnd5eapi.co/api/magic-items/${magicItemIndex}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .catch(error => {
//             // Handle errors
//             console.error('There was a problem with the fetch operation:', error);
//             // Re-throw the error to propagate it to the caller
//             throw error;
//         });
// }
