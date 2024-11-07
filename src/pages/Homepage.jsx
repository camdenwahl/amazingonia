// src/pages/Homepage.js
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import productsCSV from "../data/BigBasket.csv";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [validProducts, setValidProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  useEffect(() => {
    Papa.parse(productsCSV, {
      download: true,
      header: true,
      complete: (result) => {
        const parsedProducts = result.data;
        // Deduplicate by product name
        const uniqueProducts = deduplicateByName(parsedProducts);
        setProducts(uniqueProducts);
        setValidProducts(uniqueProducts); // Initialize with deduplicated products
      },
      error: (error) => console.error("Error parsing CSV:", error),
    });
  }, []);

  // Helper function to deduplicate by ProductName
  const deduplicateByName = (items) => {
    const seen = new Set();
    return items.filter((item) => {
      const duplicate = seen.has(item.ProductName);
      seen.add(item.ProductName);
      return !duplicate;
    });
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.ProductName.toLowerCase().includes(lowerCaseQuery)
    );
    setValidProducts(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Ensure each page has `itemsPerPage` valid products
  const getProductsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = [];

    for (let i = startIndex; i < endIndex && i < validProducts.length; i++) {
      const product = validProducts[i];
      // Check if the product is valid; if so, add it to the page
      if (product) {
        pageProducts.push(product);
      }
    }

    // If fewer than `itemsPerPage` valid products were found, get additional items
    let i = endIndex;
    while (pageProducts.length < itemsPerPage && i < validProducts.length) {
      const additionalProduct = validProducts[i];
      if (additionalProduct) {
        pageProducts.push(additionalProduct);
      }
      i++;
    }

    return pageProducts;
  };

  const currentProducts = getProductsForPage();

  const nextPage = () => {
    if (currentPage < Math.ceil(validProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="product-list flex flex-wrap justify-around">
        {currentProducts.map((product) => (
          <ProductCard key={product.Absolute_Url} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(validProducts.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(validProducts.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Homepage;
