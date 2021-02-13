import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
} from '../constants/cartConstants';

// PLACEHOLDER so don't have to setup db calls yet
let isLoggedIn = false;

export const addToCart = (productDetails, qty) => async (dispatch) => {
  try {
    /*  If user is logged in, we want to persist the cart
        in db and should update state as requesting before sending 
        that request. If not logged in, no need to update to state
        with the request status since locally adding to cart is just
        a state update itself.
            
        Note - we should validate there is still enough in stock but
        can do that during checkout when most important*/

    if (isLoggedIn) {
      //update state to pushing request
      dispatch({
        type: CART_ADD_REQUEST,
      });
      // TODO:post to db
    }

    dispatch({
      type: CART_ADD_SUCCESS,
      payload: {
        product: productDetails,
        qty: qty,
      },
    });
  } catch (error) {
    dispatch({
      type: CART_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
