import { React } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';

export default function CartScreen() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartListItems = [];
  for (const id in cartItems) {
    cartListItems.push(<CartItem key={id} product={cartItems[id]} />);
  }
  return (
    <div>
      <ul>{cartListItems}</ul>
    </div>
  );
}
