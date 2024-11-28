import React from 'react';

interface DDoneButtonProps {
  width?: string;
  height?: number;
  onClick: (event:any) => void;
  text: string;
  disabled?: boolean; // Add the disabled prop
}

const DDoneButton: React.FC<DDoneButtonProps> = ({ width, height, onClick, text, disabled }) => {
  return (
    <button
      className="btn custom-button"
      style={{ width: width || 'auto', height: height ? `${height * 1.2}em` : 'auto' }}
      onClick={onClick}
      disabled={disabled} 
    >
      {text}
    </button>
  );
};

export default DDoneButton;
