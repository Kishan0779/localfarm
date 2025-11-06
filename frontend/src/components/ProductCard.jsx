import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.images?.[0] || 'https://via.placeholder.com/220'} alt="" style={{ width: '100%', borderRadius: '6px' }} />
      <h4>{product.name}</h4>
      <p>₹{product.price} / {product.unit}</p>
      <p style={{ color: '#2e7d32' }}>Stock: {product.quantity}</p>
    </div>
  );
}
