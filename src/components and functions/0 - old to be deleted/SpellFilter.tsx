// import React, { useState } from 'react';
// import { FaDiceD20 } from 'react-icons/fa';
// import DDoneTextInput from '../../DDoneTextInput.tsx';
// import DDoneDropdown from '../../DDoneDropdown.tsx';
// import DDoneImageToggle from '../../DDoneImageToggle.tsx';


// interface SpellFilterProps {
//   onFilterChange: (filters: { name: string; level: string; school: string; spellClass: string }) => void;
// }

// const SpellFilter: React.FC<SpellFilterProps> = ({ onFilterChange }) => {
//   const [filterText, setFilterText] = useState('');
//   const [spellLevel, setSpellLevel] = useState('');
//   const [spellSchool, setSpellSchool] = useState('');
//   const [spellClass, setSpellClass] = useState('');

//   const handleFilterChange = () => {
//     onFilterChange({
//       name: filterText,
//       level: spellLevel,
//       school: spellSchool,
//       spellClass: spellClass,
//     });
//   };

//   const handleSelectSchool = (school: string) => {
//     setSpellSchool(school);
//   };

//   const handleSelectLevel = (level: string) => {
//     if (level === 'Cantrip') {
//       setSpellLevel('0');
//     } else {
//       setSpellLevel(level);
//     }
//   };

//   const handleSelectClass = (spellClass: string) => {
//     setSpellClass(spellClass);
//   };

//   const getLevelLabel = (level: string) => {
//     if (level === '') return 'Any Level';
//     if (level === '0') return 'Cantrip';
//     if (level === '1') return '1st level';
//     if (level === '2') return '2nd level';
//     if (level === '3') return '3rd level';
//     return `${level}th level`;
//   };

//   const filterReset = () => {
//     setFilterText('');
//     setSpellLevel('');
//     setSpellSchool('');
//     setSpellClass('');
//     setSelectedClass(null);

//     onFilterChange({
//       name: '',
//       level: '',
//       school: '',
//       spellClass: '',
//     });
//   };

//   const filterClass = (spellClass: string) => {
//     setSpellClass(spellClass);

//     onFilterChange({
//       name: filterText,
//       level: spellLevel,
//       school: spellSchool,
//       spellClass: spellClass,
//     });
//   };

//   const classOptions = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];
//   const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

//   const [selectedClass, setSelectedClass] = useState(null);

//   const handleToggle = (cls: string) => (selected: boolean) => {
//     if (selectedClass === cls) {
//       filterClass('');
//       setSelectedClass(null);
//     } else {
//       filterClass(cls);
//       setSelectedClass(cls);
//     }
//   };

//   const levelOptions = ['Any Level', 'Cantrip', ...Array.from({ length: 9 }, (_, i) => `${i + 1}`)];
//   const schoolOptions = ['Any School', 'Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];

//   return (
//     <ul className="custom-list">
//       <li>
//         <div className="rounded filterBoard container">
//           <section className="container m-3">
//             <br />
//             <h6 className="titleText">Available for: </h6>
//             <div className="row align-items-center justify-content-center">
//               {classOptions.map((cls) => (
//                 <div key={cls} className="col-mx-2 d-flex align-items-center text-center custom-link">
//                   <div className="py-3 text-center">
//                     <DDoneImageToggle
//                       imageName={cls.toLowerCase()}
//                       label={cls}
//                       isSelected={selectedClass === cls}
//                       onToggle={handleToggle(cls)}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//           <br />
//           <div className="container-fluid">
//             <div className="col-md-12">
//               <div className="row justify-content-around">
//                 <div className="col-md-3 d-flex align-items-center">
//                   <DDoneTextInput
//                     width="300px"
//                     placeholder="Enter Spell Name"
//                     value={filterText}
//                     onChange={(value) => setFilterText(value)}
//                     onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
//                   />
//                 </div>
//                 <div className="col-md-2 d-flex align-items-center">
//                   <DDoneDropdown
//                     width="200px"
//                     height="32px" // Number of lines for the dropdown
//                     options={levelOptions}
//                     value={getLevelLabel(spellLevel)}
//                     onChange={(value) => handleSelectLevel(value === 'Any Level' ? '' : value)}
//                   />
//                 </div>
//                 <div className="col-md-2 d-flex align-items-center">
//                   <DDoneDropdown
//                     width="200px"
//                     height="32px" // Number of lines for the dropdown
//                     options={schoolOptions}
//                     value={spellSchool || 'Any School'}
//                     onChange={(value) => handleSelectSchool(value === 'Any School' ? '' : value)}
//                   />
//                 </div>
//                 <div className="col-md-2 d-flex align-items-center">
//                   <DDoneDropdown
//                     width="200px"
//                     height="32px" // Number of lines for the dropdown
//                     options={classOptions}
//                     value={spellClass || 'Any Class'}
//                     onChange={(value) => handleSelectClass(value === 'Any Class' ? '' : value)}
//                   />
//                 </div>
//                 <div className="col-md-2 d-flex flex-column align-items-center">
//                   <button className="btn btn-outline-info w-100" onClick={handleFilterChange}>Filter</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-md-10"></div>
//               <div className="col-md-2 align-items-center">
//                 <div className="titleText mx-3 clickable" style={{ fontSize: 'small' }} onClick={() => filterReset()}>Reset Filter</div>
//               </div>
//             </div>
//           </div>
//           <br />
//         </div>
//       </li>
//     </ul>
//   );
// };

// export default SpellFilter;

// {/* <div className="row container justify-content-around">
//             {classOptions.map((cls) => (
//               <div key={cls} className="col-md-1 d-flex align-items-center text-center custom-link" onClick={() => filterClass(cls)}>
//                 <div className="p-3 text-center">
//                   <div className="class-icon">
//                     <FaDiceD20 className="login-icon" size={40} />
//                   </div>
//                   <div>{cls !== '' ? cls : 'Any Class'}</div>
//                 </div>
//               </div>
//             ))}
//           </div> */}