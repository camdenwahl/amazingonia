// src/components/ProductCard.js
import React, { useEffect, useState } from 'react';

function ProductCard({ product, onImageError }) {
  const [isImageValid, setIsImageValid] = useState(true);
  const imageUrl = product.Image_Url || './placeholder.png';

  // Inline checkImage function
  const checkImage = (url, onSuccess, onError) => {
    const img = new Image();
    img.src = url;

    img.onload = () => onSuccess();
    img.onerror = () => onError();
  };

  useEffect(() => {
    // Check if the image URL is valid
    checkImage(
      imageUrl,
      () => setIsImageValid(true),       // If the image loads, mark as valid
      () => {
        setIsImageValid(false);          // If image fails, mark as invalid
        onImageError(product.Absolute_Url); // Notify parent component
      }
    );
  }, [imageUrl, onImageError, product.Absolute_Url]);

  if (!isImageValid) {
    return null; // Don't render the card if the image is invalid
  }

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.ProductName} />
      <h3>{product.ProductName}</h3>
      <p>Brand: {product.Brand}</p>
      <p className = "font-extrabold">Price: ${product.Price}</p>
      <p>Quantity: {product.Quantity}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
