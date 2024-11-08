import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

function ProductCardGolden({ product, onImageLoadError }) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const imageUrl = product.Image_Url || './placeholder.png';

  const isInCart = cart.some((item) => item.Absolute_Url === product.Absolute_Url);

  const handleButtonClick = () => {
    if (isInCart) {
      removeFromCart(product.Absolute_Url);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="product-card flex flex-col items-center text-center border border-gray-300 rounded-md bg-white shadow hover:shadow-lg transition-shadow duration-200">
      <img
        className="product-image w-full h-auto object-contain mb-2"
        src={imageUrl}
        alt={product.ProductName}
        onError={() => onImageLoadError(product.Absolute_Url)}
      />
      <div className="product-info w-full">
        <h3 className="product-title text-sm md:text-base font-semibold mb-1 text-gray-900">
          {product.ProductName}
        </h3>
        <p className="product-brand text-xs text-gray-600 mb-2">
          {product.Brand}
        </p>
        <p className="product-price text-sm font-medium text-red-600 mb-2">
          {product.DiscountPrice ? (
            <>
              <span className="price text-lg font-bold">${product.DiscountPrice}</span>
              <span className="discount-price text-xs line-through text-gray-500 ml-2">
                ${product.Price}
              </span>
            </>
          ) : (
            <span className="price text-lg font-bold">${product.Price}</span>
          )}
        </p>
        <p className="product-quantity text-xs text-gray-500 mb-2">
          Quantity: {product.Quantity}
        </p>
        <button
          className="add-to-cart w-full py-2 bg-yellow-300 hover:bg-yellow-400 text-sm md:text-base rounded mt-2"
          onClick={handleButtonClick}
        >
          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCardGolden;
