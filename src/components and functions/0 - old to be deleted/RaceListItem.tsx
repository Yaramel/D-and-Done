// import React from 'react';
// import { useState } from 'react';
// import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";


// interface raceInputs {
//     itemInfo: any;
// }

// export default function RaceListItem({ itemInfo }: raceInputs) {
//     const [showDescription, setShowDescription] = useState(false);

//     const toggleDescription = () => {
//         setShowDescription(!showDescription);
//     };

//     return (
//         <>
//             <div className="rounded spellBoard p-3 my-3">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-1 d-flex align-items-center">
//                             <img className="noBackground" src="/src/assets/logo.png" alt="Logo" width="30" height="30" />
//                         </div>
//                         <div className="col-md-2 d-flex align-items-center">
//                             {itemInfo && itemInfo.name ? itemInfo.name : "-"}

//                         </div>
//                         <div className="col-md-5 d-flex align-items-center">
//                             <p className="">{itemInfo.traits && itemInfo.traits.length ? (
//                                 itemInfo.traits.map((item, index) => (
//                                     <span key={index}>
//                                         {item.name}
//                                         {index < itemInfo.traits.length - 1 && ", "}
//                                     </span>
//                                 ))) : "-"}</p>
//                         </div>
//                         <div className="col-md-2 d-flex align-items-center">
//                             <p className="">{itemInfo.ability_bonuses && itemInfo.ability_bonuses.length == 6 ? "+1 to ALL" : (itemInfo.ability_bonuses && itemInfo.ability_bonuses.length ? (
//                                 itemInfo.ability_bonuses.map((item, index) => (
//                                     <span key={index}>
//                                         +{item.bonus} {item.ability_score.name}
//                                         {index < itemInfo.ability_bonuses.length - 1 && ", "}
//                                     </span>
//                                 ))) : "-")}</p>

//                         </div>
//                         <div className="col-md-1 d-flex align-items-center">
//                             <a href={itemInfo && (window.location.href.replace("s/", "s") + "/" + itemInfo.index.replaceAll("/", ""))} className="btn btn-outline-info">More Info</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// } 