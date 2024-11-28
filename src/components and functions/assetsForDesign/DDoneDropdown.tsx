import React from 'react';

interface HomebrewDropdownProps {
  width?: string;
  height?: string; // Number of lines
  lines?: number; // Number of lines
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const DDoneDropdown: React.FC<HomebrewDropdownProps> = ({ width, height, lines, options, value, onChange }) => {
  const handleChange = (option: string) => {
    onChange(option);
  };

  return (
    <div className="dropdown" style={{ width: width || 'auto', height: height ||"auto" }}>
      <button
        className="btn custom-dropdown-toggle dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{ width: '100%', height:"100%" }}
      >
        {value || 'Select an Option'}
      </button>
      <div className="dropdown-menu" style={{ maxHeight: lines ? `${lines * 2.4}em` : 'auto', overflowY: 'auto' }}>
        {options.map((option, index) => (
          <button key={index} className="dropdown-item" onClick={() => handleChange(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DDoneDropdown;