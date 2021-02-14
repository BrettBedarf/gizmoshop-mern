import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button, Row, Card, Col, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Message from '../components/Message';
import { clearCart } from '../actions/cartActions';
import { formatMoney } from '../utilities';

export default function CartScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartListItems = [];
  for (const id in cartItems) {
    cartListItems.push(
      <ListGroup.Item>
        <CartItem key={id} product={cartItems[id]} />
      </ListGroup.Item>
    );
  }

  const handleClear = (e) => {
    dispatch(clearCart());
  };

  const handleCheckout = (e) => {
    // Go to login screen unless already logged in
    history.push('/login?redirect=shipping');
  };
  const addTotal = (acc, curId) => {
    const { price, qtyInCart: qty } = cartItems[curId];
    return acc + parseFloat(price) * qty;
  };

  return (
    <>
      <h1>Shopping Cart</h1>
      {cartListItems.length === 0 ? (
        <Message>
          You're cart is empty!{'    '}
          <Link to="/">{`     `}Go Home.</Link>
        </Message>
      ) : (
        <Container>
          <Row className="flex-row-reverse">
            <Button variant="light" size="sm" onClick={handleClear}>
              Clear Cart
            </Button>
          </Row>
          <ListGroup variant="flush">{cartListItems}</ListGroup>
          <Row className="d-flex justify-content-end align-items-right">
            <Col xs={12} md={5}>
              <Card>
                <Card.Body>
                  <Card.Title className="text-right">
                    Subtotal: $
                    {formatMoney(Object.keys(cartItems).reduce(addTotal, 0))}
                  </Card.Title>{' '}
                  <Button
                    variant="primary"
                    className="btn-block"
                    onClick={handleCheckout}
                    auto
                  >
                    Proceed To Checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
