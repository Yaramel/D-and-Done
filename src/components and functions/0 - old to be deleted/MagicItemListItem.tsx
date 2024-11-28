// import React from 'react';
// import { useState } from 'react';
// import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";


// interface magicItemInputs {
//     itemInfo: any;
// }

// export default function MagicItemListItem({ itemInfo }: magicItemInputs) {
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
//                         <div className="col-md-3 d-flex align-items-center">
//                             {itemInfo && itemInfo.name ? itemInfo.name : "-"}

//                         </div>
//                         <div className="col-md-7 d-flex align-items-center">
//                             Properties: {itemInfo.desc[0]}
//                         </div>


//                         <div className="col-md-1 d-flex align-items-center">
//                             <a href="#" onClick={(e) => { e.preventDefault(); toggleDescription(); }}>
//                                 {showDescription ? <  AiFillCaretUp className="icon-link" size={40} /> : <AiFillCaretDown className="icon-link" size={40} />}
//                             </a>
//                         </div>




//                         {showDescription && (
//                             <div className="container">
//                                 <hr className="my-5 separator" style={{ borderWidth: "2px"}} />

//                                 <p>{itemInfo && itemInfo.desc[1]}</p>

//                                 {/* <a href={itemInfo && (window.location.href.replace("s/", "s") .replace("t/", "t") + "/" + itemInfo.index.replaceAll("/", ""))} className="btn btn-outline-info">More Info</a> */}

//                             </div>
//                         )}

//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

 