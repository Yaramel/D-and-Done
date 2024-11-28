// import React from 'react';
// import { useState } from 'react';
// import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";


// interface equipmentInputs {
//     itemInfo: any;
// }

// export default function EquipmentListItem({ itemInfo }: equipmentInputs) { 
//     const [showDescription, setShowDescription] = useState(false);

//     const toggleDescription = () => {
//         setShowDescription(!showDescription);
//     };

//     return (
//         <>
//             <div className="rounded equipmentBoard p-3 my-3">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-1 d-flex align-items-center">
//                             <img className="noBackground" src="/src/assets/logo.png" alt="Logo" width="30" height="30" />
//                         </div>
//                         <div className="col-md-3 d-flex align-items-center">
//                             {itemInfo && itemInfo.name ? itemInfo.name : "-"}

//                         </div>
//                         <div className="col-md-3 d-flex align-items-center">
//                             {itemInfo && itemInfo.equipment_category ? itemInfo.equipment_category.name : "-"}

//                         </div>
//                         <div className="col-md-2 d-flex align-items-center">
//                             {itemInfo && itemInfo.weight ? itemInfo.weight + "oz" : "-"}
//                         </div>
//                         <div className="col-md-2 d-flex align-items-center">
//                             {itemInfo && itemInfo.cost ? itemInfo.cost.quantity + " " + itemInfo.cost.unit  : "-"}                        
//                         </div>
                        
//                         <div className="col-md-1 d-flex align-items-center">
//                             <a href="#" onClick={(e) => { e.preventDefault(); toggleDescription(); }}>
//                                 {showDescription ? <  AiFillCaretUp className="icon-link" size={40} /> : <AiFillCaretDown className="icon-link" size={40} />}
//                             </a>
//                         </div>

//                         {showDescription && (
//                             <div className="container">
//                                 <hr className="my-5 separator" style={{ borderWidth: "2px" }} />

//                                 <p>{itemInfo && itemInfo.desc}</p>

//                                 <a href={itemInfo && (window.location.href.replace("s/", "s") .replace("t/", "t") + "/" + itemInfo.index.replaceAll("/", ""))} className="btn btn-outline-info">More Info</a>

//                             </div>
//                         )}

//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

 