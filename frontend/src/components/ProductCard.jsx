import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              rating={
                //Array.isArray() covers undefined and null values
                Array.isArray(product.reviews) && product.reviews.length
                  ? product.reviews.reduce((acc, cur) => acc + cur.rating)
                  : product.rating
              }
              reviewCount={
                //Array.isArray() covers undefined and null values
                Array.isArray(product.reviews) && product.reviews.length
                  ? product.reviews.length
                  : product.numReviews
              }
            />
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
