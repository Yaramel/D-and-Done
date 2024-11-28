// import React, { useState } from 'react';
// import DDoneTextInput from '../../DDoneTextInput.tsx';
// import DDoneDropdown from '../../DDoneDropdown.tsx';

// interface EquipmentFilterProps {
//   onFilterChange: (filters: { name: string, category: string }) => void;
// }

// const EquipmentFilter: React.FC<EquipmentFilterProps> = ({ onFilterChange }) => {
//   const [filterText, setFilterText] = useState('');
//   const [equipmentCategory, setEquipmentCategory] = useState('');

//   const handleFilterChange = () => {
//     onFilterChange({
//       name: filterText,
//       category: equipmentCategory
//     });
//   };

//   const options = ['Any Category', 'Adventuring Gear', 'Armor', 'Mounts and Vehicles', 'Tools', 'Weapon'];

//   return (
//     <div className='row'>
//       <div className='col-md-6'>
//         <DDoneTextInput
//           width="300px"
//           height={2} // Number of lines
//           placeholder="Enter equipment name"
//           value={filterText}
//           onChange={(value) => setFilterText(value)}
//           onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
//         />
//       </div>
//       <div className='col-md-5'>
//         <DDoneDropdown
//           width="300px"
//           height={5} // Number of lines for the dropdown
//           options={options}
//           value={equipmentCategory}
//           onChange={(value) => setEquipmentCategory(value)}
//         />
//       </div>
//       <div className='col-md-1'>
//         <button className="btn btn-primary mt-2" onClick={handleFilterChange}>Filter</button>
//       </div>
//     </div >
//   );
// };

// export default EquipmentFilter;
