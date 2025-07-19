import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ShoppingCart, Search, Settings } from "@mui/icons-material";
import MobileFrame from "../../components/shared/MobileFrame";
import Button from "../../components/shared/Button";
import PageLoader from "../../components/shared/PageLoader";
import CategoryTabs from "./components/CategoryTabs";
import ProductCard from "./components/ProductCard";
import productsData from "../../data/products.json";

const Home = () => {
  const { currentUser, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("phones");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Simulate loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  // Filter products based on active category
  useEffect(() => {
    const filtered = productsData.products.filter(
      (product) => product.category === activeCategory
    );
    setFilteredProducts(filtered);
  }, [activeCategory]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleProductClick = (product) => {
    console.log("Product clicked:", product);
    // TODO: Navigate to product detail page
  };

  const handleCartClick = () => {
    console.log("Cart clicked");
    // TODO: Navigate to cart page
  };

  // Show loading screen
  if (isLoading) {
    return <PageLoader message="Welcome to CheapDeals!" />;
  }

  return (
    <MobileFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Header with Search and Cart */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
            gap: "10px",
            background: "#FFFFFF",
          }}
        >
          {/* Search Bar */}
          <div
            style={{
              flex: 1,
              height: "40px",
              background: "#F5F5F5",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              padding: "0 15px",
              gap: "8px",
            }}
          >
            <Search
              style={{
                color: "#999",
                fontSize: "18px",
              }}
            />
            <input
              type="text"
              placeholder="e.g iphone 14, ipad pro, laptop"
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                flex: 1,
                fontSize: "12px",
                color: "#666",
                fontFamily: '"Poppins", sans-serif',
              }}
            />
          </div>

          {/* Cart Icon */}
          <div
            onClick={handleCartClick}
            style={{
              position: "relative",
              cursor: "pointer",
            }}
          >
            <ShoppingCart
              style={{
                color: "#B3B3B3",
                fontSize: "24px",
              }}
            />
            {/* Cart Badge */}
            <div
              style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                width: "8px",
                height: "8px",
                background: "#FF0000",
                borderRadius: "50%",
              }}
            />
          </div>

          {/* Settings Icon */}
          <div
            style={{
              cursor: "pointer",
            }}
          >
            <Settings
              style={{
                color: "#B3B3B3",
                fontSize: "24px",
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            padding: "0 20px",
            marginBottom: "20px",
          }}
        >
          <CategoryTabs
            categories={productsData.categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Featured Items Title */}
        <div
          style={{
            padding: "10px",
          }}
        >
          <h2
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "1.5em",
              color: "#000",
              textAlign: "left",
              margin: 0,
            }}
          >
            Featured Items
          </h2>
        </div>

        {/* Products Grid */}
        <div
          style={{
            flex: 1,
            padding: "10px 20px 20px 20px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "15px",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>

          {/* Show message if no products */}
          {filteredProducts.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "#666",
                fontFamily: '"Poppins", sans-serif',
                fontSize: "14px",
              }}
            >
              No products found in this category.
            </div>
          )}
        </div>

        {/* User Info Footer (if signed in) */}
        {currentUser && (
          <div
            style={{
              padding: "10px 20px",
              background: "#F8F8F8",
              borderTop: "1px solid #E0E0E0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: "12px",
                color: "#666",
              }}
            >
              {currentUser.displayName || currentUser.email}
            </span>
            <Button
              onClick={handleLogout}
              variant="secondary"
              style={{
                fontSize: "10px",
                padding: "4px 8px",
                background: "#FFFFFF",
                border: "1px solid #E0E0E0",
                color: "#666",
              }}
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </MobileFrame>
  );
};

export default Home;
