// import React, { useState, useEffect } from 'react';
// import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";  // npm install react-icons

// interface Inputs {
//     itemInfo: any;
//     catInfo: any[];
// }

// const RuleListItem: React.FC<Inputs> = ({ itemInfo, catInfo }) => {
//     const [showDescription, setShowDescription] = useState(false);

//     const categoryName = Object.keys(catInfo).find(catName => catInfo[catName].includes(itemInfo.name)) || '';

//     return (
//         <div className="rounded spellBoard p-3 my-3">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-4 d-flex align-items-center">
//                         {itemInfo && itemInfo.name}
//                     </div>
//                     <div className="col-md-3 d-flex align-items-center">
//                         {categoryName}
//                     </div>
//                     <div className="col-md-3 d-flex align-items-center">
//                         {itemInfo.author? <span className="badge badge-secondary">{"homebrew"}</span> : <span className="badge badge-secondary">{"core"}</span> }

//                     </div>
//                     <div className="col-md- d-flex align-items-center mx-3">
//                         <a 
//                             href={itemInfo && (window.location.href.replace("l/", "l") + "/" + itemInfo.index.replaceAll("/", ""))} 
//                             className="btn btn-outline-info"
//                         >
//                             More Info
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RuleListItem;
 