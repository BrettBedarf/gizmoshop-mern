import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_UPDATE_ITEM,
  CART_UPDATE_FAIL,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_FAIL,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

// PLACEHOLDER so don't have to setup db calls yet
let isLoggedIn = false;

const addToCart = (productDetails, qty) => async (dispatch, getState) => {
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

    //save current cart state to local storage
    saveToStorage(getState);
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

const updateQuantity = (productId, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_UPDATE_ITEM,
      payload: {
        productId: productId,
        qty: qty,
      },
    });
    saveToStorage(getState);
  } catch (error) {
    dispatch({
      type: CART_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const removeItem = (itemId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM, payload: itemId });
    saveToStorage(getState);
  } catch (error) {
    dispatch({
      type: CART_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const clearCart = () => async (dispatch, getState) => {
  dispatch({ type: CART_CLEAR_ITEMS });
  saveToStorage(getState);
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

const saveToStorage = (getState) => {
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export { addToCart, updateQuantity, clearCart, removeItem };
