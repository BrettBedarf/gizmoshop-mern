import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import QuantitySelector from './QuantitySelector';
import { formatMoney } from '../utilities';
import { updateQuantity } from '../actions/cartActions';

export default function CartItem(props) {
  const { _id, name, price, image, countInStock, qtyInCart } = props.product;

  const dispatch = useDispatch();
  const dispatchWithProduct = (addQty) => {
    dispatch(updateQuantity(_id, addQty));
  };

  return (
    <Row className="align-items-center">
      <Col xs={2} className="align-items-center">
        <Image src={image} fluid />
      </Col>
      <Col xs={7} md={5}>
        <h6>{name}</h6>
      </Col>
      <Col
        xs={{ order: 'last', span: 3, offset: 9 }}
        md={{ span: 3, offset: 0 }}
        className={'text-right'}
      >
        <QuantitySelector
          currentQuantity={qtyInCart}
          maxQty={countInStock}
          setQuantity={dispatchWithProduct}
        />
      </Col>
      <Col xs={3} md={{ order: 'last', span: 2 }} className={'text-right'}>
        $ {formatMoney(price * qtyInCart)}{' '}
      </Col>
    </Row>
  );
}
