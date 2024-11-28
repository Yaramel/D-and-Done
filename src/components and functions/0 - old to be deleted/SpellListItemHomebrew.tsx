// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
// import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";  // npm install react-icons


// interface Inputs {
//     itemInfo: any;
// }

// export default function SpellListItem({ itemInfo }: Inputs) {
//     const [showDescription, setShowDescription] = useState(false);

//     const toggleDescription = () => {
//         setShowDescription(!showDescription);
//     };

//     return ( 
//         <>
//             <div className="rounded spellBoard p-3 my-3" >
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-1 d-flex align-items-center">
//                             <img className="noBackground" src="/src/assets/logo.png" alt="Logo" width="30" height="30" />

//                             <div className="d-flex align-items-center m-2" style={{ fontSize: "small" }}>
//                                 {itemInfo && (itemInfo.level == "0" ? "Cantrip" :
//                                     (itemInfo && (itemInfo.level == "1" ? `${itemInfo.level}st` :
//                                         (itemInfo && (itemInfo.level == "2" ? `${itemInfo.level}nd` :
//                                             (itemInfo && (itemInfo.level == "3" ? `${itemInfo.level}rd` :
//                                                 `${itemInfo.level}th`)))))))}
//                             </div>
//                         </div>
//                         <div className="col-md-1 d-flex align-items-center ">
//                             {itemInfo && itemInfo.name}
//                         </div>
//                         <div className="col-md-1 d-flex align-items-center">
//                             {itemInfo && itemInfo.casting_time}
//                         </div>
//                         <div className="col-md-2 d-flex align-items-center">
//                             {itemInfo && itemInfo.duration}
//                         </div>
//                         <div className="col-md-1 d-flex align-items-center">
//                             {itemInfo && (itemInfo.range && itemInfo.area_of_effect ? `${itemInfo.range} / ${itemInfo.area_of_effect.type} ${itemInfo.area_of_effect.size}ft` : (itemInfo && itemInfo.range ? itemInfo.range : "-"))}
//                         </div>
//                         <div className="col-md-2 d-flex align-items-center">
//                             {itemInfo && itemInfo.dc ? `${itemInfo.dc.dc_type.name} for ${itemInfo.dc.dc_success}` : (itemInfo && itemInfo.attack_type ? itemInfo.attack_type : "-")}
//                         </div>
//                         <div className="col-md-1 d-flex align-items-center">
//                             {itemInfo && itemInfo.damage ? (itemInfo.damage.damage_at_slot_level ? `${itemInfo.damage.damage_at_slot_level[itemInfo.level]} / ${itemInfo.damage.damage_type.name}` : ( itemInfo.damage.damage_at_character_level ? `${itemInfo.damage.damage_at_character_level[1]} / ${itemInfo.damage.damage_type.name}` :"-")) : "-"}
//                         </div>
//                         <div className="col-md-1 d-flex align-items-center mx-4">
//                             {itemInfo.school.name ?  itemInfo.school.name : itemInfo.school}

//                         </div>
//                         <div className="col-md-1 d-flex align-items-center  mx-3">
//                             <a href="#" onClick={(e) => { e.preventDefault(); toggleDescription(); }}>
//                                 {showDescription ? <  AiFillCaretUp className="icon-link" size={40} /> : <AiFillCaretDown className="icon-link" size={40} />}
//                             </a>
//                         </div>

//                         {showDescription && (
//                             <div>
//                                 <hr className="my-5 separator" style={{ borderWidth: "2px" }} />

//                                 <p>{itemInfo && itemInfo.desc}</p>

//                                 <a href={itemInfo && (window.location.href.replace("l/", "l") + "/" + itemInfo.index.replaceAll("/", ""))} className="btn btn-outline-info">More Info</a>

//                             </div>
//                         )}

//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
