// import React, { useState } from 'react';
// import DDoneTextInput from '../assetsForDesign/DDoneTextInput.tsx';
// import DDoneDropdown from '../assetsForDesign/DDoneDropdown.tsx';

// function RuleFilter({ onFilterChange }: any) {
//   const [filterText, setFilterText] = useState('');
//   const [ruleClass, setRuleClass] = useState('');

//   const handleFilterChange = () => {
//     onFilterChange({
//       name: filterText,
//       ruleClass: ruleClass,
//     });
//   };

//   const handleSelectClass = (ruleClass: string) => {
//     setRuleClass(ruleClass);
//   };

//   function filterReset() {
//     setFilterText('');
//     setRuleClass('');

//     onFilterChange({
//       name: '',
//       ruleClass: '',
//     });
//   }

//   function classSelect(ruleClass: string) {
//     setRuleClass(ruleClass);

//     onFilterChange({
//       name: filterText,
//       ruleClass: ruleClass,
//     });
//   }

//   const ruleCategories = ['Any Category', 'Adventuring', 'Appendix', 'Combat', 'Equipment', 'Spellcasting', 'Using Ability'];

//   return (
//     <ul className="custom-list">
//       <li>
//         <div className="rounded filterBoard container">
//           <br />

//           <div className="container-fluid">
//             <div className="col-md-12">
//               <div className="row justify-content-around">
//                 <div className="col-md-2 d-flex align-items-center">
//                   <DDoneTextInput
//                     width="100%"
//                     height={2}
//                     placeholder="Search by rule name"
//                     value={filterText}
//                     onChange={(value) => setFilterText(value)}
//                     onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
//                   />
//                 </div>

//                 <div className="col-md-2 d-flex align-items-center">
//                   <DDoneDropdown
//                     width="100%"
//                     height={5}
//                     options={ruleCategories}
//                     value={ruleClass || 'Any Category'}
//                     onChange={(value) => handleSelectClass(value === 'Any Category' ? '' : value)}
//                   />
//                 </div>

//                 <div className="col-md-2 d-flex flex-column align-items-center">
//                   <button className="btn btn-outline-info w-100" onClick={handleFilterChange}>
//                     Filter
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-md-10"></div>
//               <div className="col-md-2 align-items-center">
//                 <div className="titleText mx-3 clickable" style={{ fontSize: 'small' }} onClick={filterReset}>
//                   Reset Filter
//                 </div>
//               </div>
//             </div>
//           </div>

//           <br />
//         </div>
//       </li>
//     </ul>
//   );
// }

// export default RuleFilter;
