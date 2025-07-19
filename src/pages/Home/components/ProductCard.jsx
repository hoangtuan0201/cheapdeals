import { useState } from "react";

const ProductCard = ({ product, onClick, className = "", style = {} }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price) => {
    return `${price}€`;
  };

  const cardStyles = {
  width: "160px",
  height: "auto",
  background: "#FFFFFF",
  borderRadius: "15px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  overflow: "hidden",
  border: "1px solid #F0F0F0",
  display: "flex",
  flexDirection: "column",
  padding: "10px"
  };


  const imageContainerStyles = {
    width: "140px",
    height: "120px",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#f8f8f8",
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  };

  const placeholderStyles = {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
    fontSize: "12px",
    fontFamily: '"Poppins", sans-serif',
  };

  const titleStyles = {
  marginTop: "10px",
  fontSize: "11px",
  fontWeight: 400,
  lineHeight: "1.4em",
  };


  const currentPriceStyles = {
    marginTop: "5px",
    fontSize: "12px",
    color: "#00C851",
    fontWeight: 600,
  };

  const originalPriceStyles = {
    fontSize: "10px",
    color: "red",
    textDecoration: "line-through",
  };

  const ratingStyles = {
    display: "flex",
    alignItems: "center",
    fontSize: "9px",
    color: "#666",
    gap: "4px",
    marginTop: "5px",
  };





  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.15)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "0px 2px 8px rgba(0, 0, 0, 0.1)";
  };

  return (
    <div
      className={className}
      style={cardStyles}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image */}
      <div style={imageContainerStyles}>
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            style={imageStyles}
            onError={handleImageError}
          />
        ) : (
          <div style={placeholderStyles}>No Image</div>
        )}
      </div>

      {/* Product Title */}
      <div style={titleStyles}>
        {product.name}
        {product.subtitle && (
          <>
            <br />
            {product.subtitle}
          </>
        )}
      </div>

      {/* Current Price */}
      <div style={currentPriceStyles}>{formatPrice(product.currentPrice)}</div>

      {/* Original Price */}
      {product.originalPrice &&
        product.originalPrice > product.currentPrice && (
          <div style={originalPriceStyles}>
            {formatPrice(product.originalPrice)}
          </div>
        )}

      {/* Rating and Sold Count */}
      <div style={ratingStyles}>
        <span style={{ color: "#FFD84B", fontSize: "10px" }}>★</span>
        <span>{product.rating}</span>
        <span style={{ color: "#ccc" }}>●</span>
        <span>{product.soldCount} SOLD</span>
      </div>

    
    </div>
  );
};

export default ProductCard;
