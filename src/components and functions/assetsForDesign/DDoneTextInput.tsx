import React, { useState } from 'react';

interface DDoneTextInputProps {
  width?: string; // Accepts width as a string (e.g., "300px", "50%", "20ch")
  placeholder: string;
  value: string;
  isNumber?: boolean;
  limit?: number;
  onChange: (value: string) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DDoneTextInput: React.FC<DDoneTextInputProps> = ({ width, placeholder, isNumber, limit, onChange, onKeyPress }) => {

  const [actualValue, setActualValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Use a regex to ensure only numbers are accepted
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue) || !isNumber) {
      if (newValue !== "" && limit) {
        setActualValue((Math.min(limit, parseInt(newValue))).toString());
        onChange(newValue);
      }
      else {
        setActualValue(newValue);
        onChange(newValue);
      }
      
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyPress) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
      onKeyPress(event);
    }
  };

  let myPattern = "";

  if (isNumber) {
    myPattern = "\\d*";
  }

  return (
    <input
      type="text"
      className="form-control"
      style={{ width: width || 'auto', resize: 'none' }} // Apply the width directly
      placeholder={placeholder}
      value={actualValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      pattern={myPattern}
    />
  );
};

export default DDoneTextInput;
