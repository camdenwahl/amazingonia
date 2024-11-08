// src/pages/Homepage.jsx
import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Papa from 'papaparse';
import productsCSV from '../data/BigBasket.csv';
import { useCart } from '../CartContext';
import { GlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';

function Homepage() {
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

  const handleImageLoadError = (url) => {
    setValidProducts((prevProducts) =>
      prevProducts.filter((product) => product.Absolute_Url !== url)
    );
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.ProductName.toLowerCase().includes(lowerCaseQuery)
    );
    setValidProducts(filtered);
    setCurrentPage(1);
  };

  const getProductsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return validProducts.slice(startIndex, endIndex);
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

  useEffect(() => {
    console.log('Cart contents:', cart);
    console.log('Target Product:', targetProduct);
  
    // Use ProductName for comparison
    const targetProductAdded = cart.some(
      (item) => item.ProductName === targetProduct.productName
    );
    console.log('Is target product added:', targetProductAdded);
  
    if (targetProductAdded && startTime) {
      console.log('Navigating to next step...');
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
  }, [cart, targetProduct, startTime, taskTimings]);
  

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="product-list flex flex-wrap mt-20 justify-center gap-4 p-4 md:px-8 lg:px-16 mt-8">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.Absolute_Url}
            product={product}
            onImageLoadError={handleImageLoadError}
          />
        ))}
      </div>
      <div className="pagination-controls flex justify-center items-center mt-8 space-x-4">
        <button
          className="px-6 py-2 bg-[#ffd814] text-black font-bold rounded-full shadow-md hover:bg-[#f7ca00] transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-900 font-semibold">
          Page {currentPage} of {Math.ceil(validProducts.length / itemsPerPage)}
        </span>
        <button
          className="px-6 py-2 bg-[#ffd814] text-black font-bold rounded-full shadow-md hover:bg-[#f7ca00] transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
