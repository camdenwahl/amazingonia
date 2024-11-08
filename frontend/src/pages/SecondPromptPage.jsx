// src/pages/SecondPromptPage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import { useCart } from '../CartContext';

function SecondPromptPage() {
  const { designOrder, setStartTime, targetProduct } = useContext(GlobalContext);
  const { setCart } = useCart();
  const navigate = useNavigate();

  const handleStart = () => {
    // Clear the cart before starting the second task
    setCart([]);
    setStartTime(Date.now());
    navigate(designOrder[1]);
  };

  return (
    <div className="prompt-page p-4 max-w-lg mx-auto bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Second Task</h1>
      <p className="mt-4 text-center">You are to find this product and add it to your cart. You can use the search function to help you.</p>
      <p className = "text-center font-extrabold">Bath n Body Body Cream - Milk & Honey</p>
      <img
        src="https://www.bigbasket.com/media/uploads/p/l/40188829_1-faces-canada-bath-n-body-milk-honey-body-cream.jpg"
        alt={targetProduct.productName}
        className="block mx-auto my-4 w-full max-w-xs rounded"
      />
      <button
        onClick={handleStart}
        className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
      >
        Start
      </button>
    </div>
  );
}

export default SecondPromptPage;
