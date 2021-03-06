import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_UPDATE_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (
  state = {
    cartItems: {},
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { loading: true, cartProducts: [...state.cartItems] };

    case CART_ADD_SUCCESS:
      let currentQtyInCart;
      const { id: productId, ...details } = action.payload.product;
      // Check if product is already in cart and add quantities if so
      state.cartItems[productId]
        ? (currentQtyInCart = state.cartItems[productId].qtyInCart)
        : (currentQtyInCart = 0);
      let newQtyInCart = currentQtyInCart + action.payload.qty;

      return {
        ...state,
        loading: false,
        cartItems: {
          ...state.cartItems,
          [productId]: { ...details, qtyInCart: newQtyInCart },
        },
      };

    case CART_UPDATE_ITEM:
      const { productId: updateId, qty } = action.payload;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [updateId]: { ...state.cartItems[updateId], qtyInCart: qty },
        },
      };
    case CART_REMOVE_ITEM:
      const deleteId = action.payload;
      const cartItemsCopy = JSON.parse(JSON.stringify(state.cartItems));
      delete cartItemsCopy[deleteId];
      return {
        ...state,
        cartItems: { ...cartItemsCopy },
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: {},
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
