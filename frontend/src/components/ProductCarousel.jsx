import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="mb-3" interval="5000">
      {products.map((product) => (
        <Carousel.Item key={product._id} className="bg-primary">
          <Link to={`/product/${product._id}`}>
            <Image
              className="d-block w-100 m-auto"
              style={{ padding: '40px' }}
              src={product.image}
              alt={product.name}
              fluid
            />
            <Carousel.Caption
              className="carousel-caption w-100 bg-primary"
              style={{ right: '0', left: '0' }}
            >
              <h4>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
