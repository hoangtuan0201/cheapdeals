import { useState } from "react";

const CategoryTabs = ({
  categories = [],
  activeCategory,
  onCategoryChange,
  style = {},
}) => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const containerStyles = {
    width: "100%",
    height: "40px",
    background: "#E5E5E5",
    borderRadius: "20px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "0 5px",
    margin: "0 auto",
    ...style,
  };

  const getTabStyles = (category, index) => {
    const isActive = activeCategory === category.id;
    const isHovered = hoveredTab === category.id;

    const baseStyles = {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 400,
      fontSize: "10px",
      lineHeight: "1.5em",
      color: "#666666",
      cursor: "pointer",
      padding: "6px 8px",
      borderRadius: "15px",
      transition: "all 0.3s ease",
      textAlign: "center",
      whiteSpace: "nowrap",
      userSelect: "none",
      minWidth: "60px",
    };

    if (isActive) {
      return {
        ...baseStyles,
        background: "#FFFFFF",
        color: "#000000",
        fontWeight: 500,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      };
    }

    if (isHovered) {
      return {
        ...baseStyles,
        background: "rgba(255, 255, 255, 0.5)",
        color: "#333333",
      };
    }

    return baseStyles;
  };

  const handleTabClick = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category.id);
    }
  };

  const handleMouseEnter = (categoryId) => {
    setHoveredTab(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
  };

  return (
    <div style={containerStyles}>
      {categories.map((category, index) => (
        <div
          key={category.id}
          style={getTabStyles(category, index)}
          onClick={() => handleTabClick(category)}
          onMouseEnter={() => handleMouseEnter(category.id)}
          onMouseLeave={handleMouseLeave}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
