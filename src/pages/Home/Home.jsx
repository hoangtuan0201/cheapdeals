import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ShoppingCart, Search, Settings, Clear } from "@mui/icons-material";
import MobileFrame from "../../components/shared/MobileFrame";
import Button from "../../components/shared/Button";
import PageLoader from "../../components/shared/PageLoader";
import CategoryTabs from "./components/CategoryTabs";
import ProductCard from "./components/ProductCard";
import productsData from "../../data/products.json";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  // Initialize all products and simulate loading time
  useEffect(() => {
    setAllProducts(productsData.products);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  // Filter products based on active category and search query
  useEffect(() => {
    let filtered = allProducts;

    // Filter by category if no search query
    if (!searchQuery.trim()) {
      if (activeCategory === "all") {
        filtered = allProducts; // Show all products
      } else {
        filtered = allProducts.filter(
          (product) => product.category === activeCategory
        );
      }
    } else {
      // Search across all products regardless of category
      filtered = allProducts.filter((product) => {
        const searchTerm = searchQuery.toLowerCase().trim();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          (product.description &&
            product.description.toLowerCase().includes(searchTerm)) ||
          (product.brand && product.brand.toLowerCase().includes(searchTerm))
        );
      });
    }

    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery, allProducts]);

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

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  // Create categories with "All Products" tab
  const categoriesWithAll = [
    { id: "all", name: "ALL PRODUCTS", active: activeCategory === "all" },
    ...productsData.categories.map((cat) => ({
      ...cat,
      active: activeCategory === cat.id,
    })),
  ];

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
              value={searchQuery}
              onChange={handleSearchChange}
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
            {searchQuery && (
              <Clear
                onClick={handleSearchClear}
                style={{
                  color: "#999",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
            )}
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
            onClick={handleSettingsClick}
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
          }}
        >
          <CategoryTabs
            categories={categoriesWithAll}
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

        {/* Search Results Header */}
        {searchQuery.trim() && (
          <div
            style={{
              padding: "10px 20px 0 20px",
              fontSize: "14px",
              color: "#666",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            {filteredProducts.length > 0
              ? `Found ${filteredProducts.length} result${
                  filteredProducts.length !== 1 ? "s" : ""
                } for "${searchQuery}"`
              : `No results for "${searchQuery}"`}
          </div>
        )}

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
              {searchQuery.trim() ? (
                <>
                  No products found for "{searchQuery}".
                  <br />
                  <span
                    onClick={handleSearchClear}
                    style={{
                      color: "#007AFF",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginTop: "10px",
                      display: "inline-block",
                    }}
                  >
                    Clear search to see all products
                  </span>
                </>
              ) : (
                "No products found in this category."
              )}
            </div>
          )}
        </div>

             </div>
    </MobileFrame>
  );
};

export default Home;
