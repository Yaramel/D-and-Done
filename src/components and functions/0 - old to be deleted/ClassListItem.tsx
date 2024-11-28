// import React from 'react';
// import { useState } from 'react';
// import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";


// interface classInputs {
//     itemInfo: any;
// }

// export default function RaceListItem({ itemInfo }: classInputs) {
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
//                         <div className="col-md-4 d-flex align-items-center">
//                         <p className="">{itemInfo.name && itemInfo.name == "Barbarian" ? "Bruiser, Damage Dealer"  :
//                                         (itemInfo.name && itemInfo.name == "Bard" ? "Support, Crowd Control"  : 
//                                         (itemInfo.name && itemInfo.name == "Cleric" ? "Support, Bruiser"  : 
//                                         (itemInfo.name && itemInfo.name == "Druid" ? "Any"  : 
//                                         (itemInfo.name && itemInfo.name == "Fighter" ? "Bruiser, Damage Dealer"  : 
//                                         (itemInfo.name && itemInfo.name == "Monk" ? "Bruiser, Damage Dealer, Support"  : 
//                                         (itemInfo.name && itemInfo.name == "Paladin" ? "Damage Dealer, Bruiser, Support"  : 
//                                         (itemInfo.name && itemInfo.name == "Ranger" ? "Damage Dealer, Support"  : 
//                                         (itemInfo.name && itemInfo.name == "Rogue" ? "Damage Dealer"  : 
//                                         (itemInfo.name && itemInfo.name == "Sorcerer" ? "Crowd Control, Damage Dealer"  : 
//                                         (itemInfo.name && itemInfo.name == "Warlock" ? "Damage Dealer, Crowd Control"  : 
//                                         (itemInfo.name && itemInfo.name == "Wizard" ? "Crowd Control, Damage Dealer, Support" : "-"
//                                         )))))))))))}</p>
//                         </div>
//                         <div className="col-md-1 d-flex align-items-center">
//                             {itemInfo && itemInfo.hit_die ? "d" + itemInfo.hit_die : "-"}

//                         </div>
//                         <div className="col-md-2 d-flex align-items-center">
//                             <p className="">{itemInfo.saving_throws && itemInfo.saving_throws.length ? (
//                                 itemInfo.saving_throws.map((item, index) => (
//                                     <span key={index}>
//                                         {item.name}
//                                         {index < itemInfo.saving_throws.length - 1 && ", "}
//                                     </span>
//                                 ))) : "-"}</p>

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