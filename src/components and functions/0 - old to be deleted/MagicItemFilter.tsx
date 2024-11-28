// import React, { useState } from 'react';
// import DDoneTextInput from '../assetsForDesign/DDoneTextInput.tsx';
// import DDoneDropdown from '../assetsForDesign/DDoneDropdown.tsx';

// interface MagicItemFilterProps {
//   onFilterChange: (filters: { name: string, category: string }) => void;
// }

// const MagicItemFilter: React.FC<MagicItemFilterProps> = ({ onFilterChange }) => {
//   const [filterText, setFilterText] = useState('');
//   const [magicItemCategory, setMagicItemCategory] = useState('');

//   const handleFilterChange = () => {
//     onFilterChange({
//       name: filterText,
//       category: magicItemCategory
//     });
//   };

//   const options = ['Any Category', 'Armor', 'Wondrous Items', 'Weapon'];

//   return (
//     <div>
//       <DDoneTextInput
//         width="300px"
//         height={2} // Number of lines
//         placeholder="Enter magic item name"
//         value={filterText}
//         onChange={(value) => setFilterText(value)}
//         onKeyPress={(e) => { if (e.key === 'Enter') handleFilterChange(); }}
//       />
//       <DDoneDropdown
//         width="300px"
//         height={5} // Number of lines for the dropdown
//         options={options}
//         value={magicItemCategory}
//         onChange={(value) => setMagicItemCategory(value)}
//       />
//       <button className="btn btn-primary mt-2" onClick={handleFilterChange}>Filter</button>
//     </div>
//   );
// };

// export default MagicItemFilter;
