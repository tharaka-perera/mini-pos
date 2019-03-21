import axios from "axios";
import {
  ADD_CART_ITEM,
  UPDATE_CART_ITEM,
  DELETE_CART_ITEM,
  CART_ITEMS_LOADING,
  GET_CART
} from "./types";

export const setCartItemsLoading = () => ({
  type: CART_ITEMS_LOADING
});

export const getCartItems = id => dispatch => {
  dispatch(setCartItemsLoading());
  return axios.get(`/api/cart/${id}`).then(res => {
    dispatch({
      type: GET_CART,
      payload: res.data
    });
  });
};

export const deleteCartItem = item => dispatch =>
  axios.post("/api/cart/", item).then(res =>
    dispatch({
      type: DELETE_CART_ITEM,
      payload: { data: res.data, params: item }
    })
  );

export const addCartItem = item => dispatch =>
  axios.post("/api/cart", item).then(res => {
    dispatch({
      type: ADD_CART_ITEM,
      payload: { response: res.data, itemData: item }
    });
  });

export const updateCartItem = item => dispatch =>
  axios.post("/api/cart", item).then(res =>
    dispatch({
      type: UPDATE_CART_ITEM,
      payload: { data: res.data, params: item }
    })
  );
