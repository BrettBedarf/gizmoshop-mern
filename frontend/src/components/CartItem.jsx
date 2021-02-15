import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import QuantitySelector from './QuantitySelector';
import { formatMoney } from '../utilities';
import { updateQuantity, removeItem } from '../actions/cartActions';

export default function CartItem(props) {
  const { _id, name, price, image, countInStock, qtyInCart } = props.product;

  const dispatch = useDispatch();
  const dispatchWithProduct = (addQty) => {
    dispatch(updateQuantity(_id, addQty));
  };

  const handleRemoveButton = (e) => {
    dispatch(removeItem(_id));
  };

  return (
    <Row className="align-items-center justify-content-between">
      <Col xs={3} md={2} className="align-items-center">
        <Link to={`/product/${_id}`}>
          <Image src={image} fluid />
        </Link>
      </Col>
      <Col xs={9} md={3}>
        <Link to={`/product/${_id}`}>
          <h6>{name}</h6>
        </Link>
      </Col>
      <Col
        xs={5}
        md={{ span: 4, offset: 0 }}
        className={
          'justify-content-center text-align-center d-flex flex-row-reverse'
        }
      >
        <QuantitySelector
          currentQuantity={qtyInCart}
          maxQty={countInStock}
          setQuantity={dispatchWithProduct}
        />
      </Col>
      <Col xs={3} sm={{ span: 2 }} className={'text-right text-nowrap'}>
        $ {formatMoney(price * qtyInCart)}{' '}
      </Col>
      <Col xs={1} className="d-flex justify-content-right">
        <Image
          src="./images/removeIcon.png"
          className="ml-auto"
          style={{ width: '.7rem', height: '.7rem', cursor: 'pointer' }}
          onClick={handleRemoveButton}
        ></Image>
      </Col>
    </Row>
  );
}
