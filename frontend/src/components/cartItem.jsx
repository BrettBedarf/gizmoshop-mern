import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
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
        <Image src={image} fluid />
      </Col>
      <Col xs={9} md={3}>
        <h6>{name}</h6>
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
          style={{ width: '.5rem', height: '.5rem' }}
          onClick={handleRemoveButton}
        ></Image>
      </Col>
    </Row>
  );
}
