// src/pages/HomepageGolden.jsx
import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/GoldenHeader';
import ProductCardGolden from '../components/ProductCardGolden';
import Papa from 'papaparse';
import productsCSV from '../data/BigBasket.csv';
import { useCart } from '../CartContext';
import { GlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';

function HomepageGolden() {
  const [products, setProducts] = useState([]);
  const [validProducts, setValidProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const { cart } = useCart();
  const { startTime, setTaskTimings, taskTimings, setStartTime, targetProduct } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    Papa.parse(productsCSV, {
      download: true,
      header: true,
      complete: (result) => {
        const parsedProducts = result.data;
        const uniqueProducts = deduplicateByNameAndQuantity(parsedProducts);
        setProducts(uniqueProducts);
        setValidProducts(uniqueProducts);
      },
      error: (error) => console.error('Error parsing CSV:', error),
    });
  }, []);

  const deduplicateByNameAndQuantity = (items) => {
    const seen = new Set();
    return items.filter((item) => {
      const productKey = item.ProductName.toLowerCase();
      if (seen.has(productKey)) {
        return false;
      } else {
        seen.add(productKey);
        return true;
      }
    });
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.ProductName.toLowerCase().includes(lowerCaseQuery)
    );
    setValidProducts(filtered);
    setCurrentPage(1);
  };

  const handleImageLoadError = (url) => {
    setValidProducts((prevProducts) =>
      prevProducts.filter((product) => product.Absolute_Url !== url)
    );
  };

  const getProductsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return validProducts.slice(startIndex, endIndex);
  };

  const currentProducts = getProductsForPage();

  // Function to split array into chunks of a specific size (3 items per container)
  const chunkArray = (array, chunkSize = 3) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  // Create parent containers with exactly 3 items each
  const parentContainers = chunkArray(currentProducts, 3);

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

  useEffect(() => {
    // Check if the target product is in the cart
    const targetProductAdded = cart.some(
      (item) => item.Absolute_Url === targetProduct.productUrl
    );
    if (targetProductAdded && startTime) {
      const endTime = Date.now();
      if (!taskTimings.firstTaskTime) {
        setTaskTimings({ ...taskTimings, firstTaskTime: endTime - startTime });
        setStartTime(null);
        navigate('/second-prompt');
      } else {
        setTaskTimings({ ...taskTimings, secondTaskTime: endTime - startTime });
        setStartTime(null);
        navigate('/after-survey');
      }
    }
  }, [cart]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="product-list">
        {parentContainers.map((containerProducts, index) => (
          <div key={index} className="parent-container">
            {containerProducts.length > 0 && (
              <div className="golden-section-large">
                <ProductCardGolden
                  product={containerProducts[0]} // First card as the large rectangle
                  onImageLoadError={handleImageLoadError}
                />
              </div>
            )}
            {containerProducts.length > 1 && (
              <div className="golden-section-small">
                <div className="second-card-container">
                  <div className="half-height">
                    <ProductCardGolden
                      product={containerProducts[1]} // Second card
                      onImageLoadError={handleImageLoadError}
                    />
                  </div>
                </div>
                {containerProducts.length > 2 && (
                  <div className="third-card-container">
                    <div className="quarter-height">
                      <ProductCardGolden
                        product={containerProducts[2]} // Third card
                        onImageLoadError={handleImageLoadError}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pagination-controls flex justify-center items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {Math.ceil(validProducts.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(validProducts.length / itemsPerPage)}
          className="mx-2 px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default HomepageGolden;
