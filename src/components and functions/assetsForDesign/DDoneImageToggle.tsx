import React from "react";

interface DDoneImageToggleProps {
  imageName: string;
  label: string;
  isSelected: boolean;
  onToggle: (isSelected: boolean) => void;
}

// importa todas as imagens da pasta classes
const classImages = import.meta.glob("/src/assets/classes/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const DDoneImageToggle: React.FC<DDoneImageToggleProps> = ({
  imageName,
  label,
  isSelected,
  onToggle,
}) => {
  const handleClick = () => {
    onToggle(!isSelected);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  // resolve a imagem dinamicamente
  const imageSrc = classImages[`/src/assets/classes/${imageName}.png`];

  return (
    <div
      className={`image-toggle-container ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      style={{ cursor: "pointer", textAlign: "center", padding: "10px" }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="class-icon"
        style={{
          cursor: "pointer",
          textAlign: "center",
          padding: "10px",
          border: isSelected
            ? "2px solid #0efafa "
            : "2px solid transparent",
        }}
      >
        <img
          src={imageSrc}
          alt={label}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </div>
      <div>{label}</div>
    </div>
  );
};

export default DDoneImageToggle;
