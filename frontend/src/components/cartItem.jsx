import React from 'react';

export default function cartItem({ product }) {
  return <li key={product.key}>{product.name}</li>;
}
