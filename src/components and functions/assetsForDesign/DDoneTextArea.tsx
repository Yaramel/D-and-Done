import React from 'react';

interface DDoneTextAreaProps {
  width?: string;
  height?: number; // Number of lines
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const DDoneTextArea: React.FC<DDoneTextAreaProps> = ({ width, height, placeholder, value, onChange, onKeyPress }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (onKeyPress) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
      onKeyPress(event);
    }
  };

  const cols = width ? Math.floor(parseInt(width) / 8) : undefined;

  return (
    <textarea
      className="form-control"
      style={{ width: width || 'auto', height: height ? `${height * 1.2}em` : 'auto', resize: 'none' }}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      rows={height}
      cols={cols}
    />
  );
};

export default DDoneTextArea;