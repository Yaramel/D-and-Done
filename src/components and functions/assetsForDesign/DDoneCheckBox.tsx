import React, { useState } from 'react';

interface HomebrewCheckBoxProps {
  text: string;
  onChange?: (isChecked: boolean) => void;
}

const DDoneCheckBox: React.FC<HomebrewCheckBoxProps> = ({ text, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className="form-check">
      <input 
        className="form-check-input" 
        type="checkbox" 
        id={"flexCheckChecked" + text}
        checked={isChecked} 
        onChange={handleChange} 
      />
      <label className="form-check-label" htmlFor={"flexCheckChecked" + text}>
        {text}
      </label>
    </div>
  );
};

export default DDoneCheckBox;
