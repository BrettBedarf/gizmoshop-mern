import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
} from '../constants/cartConstants';

export const cartReducer = (
  state = {
    cartProducts: {},
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { loading: true, cartProducts: [...state.cartProducts] };

    case CART_ADD_SUCCESS:
      let currentQtyInCart;
      const { id: productId, ...details } = action.payload.product;
      // Check if product is already in cart and add quantities if so
      state.cartProducts[productId]
        ? (currentQtyInCart = state.cartProducts[productId].qtyInCart)
        : (currentQtyInCart = 0);
      let newQtyInCart = currentQtyInCart + action.payload.qty;

      return {
        ...state,
        loading: false,
        cartProducts: {
          ...state.cartProducts,
          [productId]: { ...details, qtyInCart: newQtyInCart },
        },
      };
    default:
      return state;
  }
};

let testProduct = {
  product: {
    loading: false,
    product: {
      countInStock: 11,
      isAvailable: true,
      _id: '5fe502455b353534704465da',
      name: 'Sony Playstation 4 Pro White Version',
      image: '/images/playstation.jpg',
      description:
        'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
      brand: 'Sony',
      category: 'Electronics',
      price: '399.99',
      rating: 4.9,
      numReviews: 12,
      user: '5fe502445b353534704465d4',
      reviews: [],
      __v: 0,
      createdAt: '2020-12-24T21:04:05.389Z',
      updatedAt: '2020-12-24T21:04:05.389Z',
      id: '5fe502455b353534704465da',
    },
  },
  qty: 1,
};
