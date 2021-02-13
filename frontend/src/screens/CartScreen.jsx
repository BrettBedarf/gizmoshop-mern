import { React } from 'react';
import { useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import CartItem from '../components/CartItem';

export default function CartScreen() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartListItems = [];
  for (const id in cartItems) {
    cartListItems.push(
      <ListGroup.Item>
        <CartItem key={id} product={cartItems[id]} />
      </ListGroup.Item>
    );
  }

  return (
    <ListGroup variant="flush">
      {cartListItems}
      {/* <ListGroup.Item>{cartListItems}</ListGroup.Item> */}
      {/* <div>
        <ul>{cartListItems}</ul>
      </div> */}
    </ListGroup>
  );
}
