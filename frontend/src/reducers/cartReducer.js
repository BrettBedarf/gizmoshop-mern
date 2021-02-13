import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
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
    default:
      return state;
  }
};
