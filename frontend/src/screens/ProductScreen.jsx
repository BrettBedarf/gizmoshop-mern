import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  listProductDetails,
  clearProductDetails,
} from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

import QuantitySelector from '../components/QuantitySelector';

const ProductScreen = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const maxQty = product.countInStock;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    //clear product from state on unmount
    return () => {
      dispatch(clearProductDetails());
    };
  }, [match, dispatch]);

  let inStock;
  if (product) {
    //product won't exist if there's an error fetching
    inStock = product.countInStock === 0 ? false : true;
  }

  const addToCartHandler = (e) => {
    dispatch(addToCart(product, quantity));
  };

  return (
    <>
      {/* Back button link to home */}
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {/* Display loading icon, error message, or fetched product details
		depending on state */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid></Image>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
                <Rating
                  rating={product.rating}
                  reviewCount={product.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
              <ListGroup.Item>
                {/* Conditionally display quantity selector or out of stock*/}
                {!inStock ? (
                  <span style={{ color: 'red' }}>Out of Stock!</span>
                ) : (
                  <QuantitySelector
                    currentQuantity={quantity}
                    setQuantity={setQuantity}
                  />
                )}{' '}
                {inStock && quantity === maxQty && (
                  <span>
                    <i>Max quantity available is {maxQty}</i>
                  </span>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  block
                  disabled={!inStock ? true : false}
                  onClick={addToCartHandler}
                >
                  {' '}
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
