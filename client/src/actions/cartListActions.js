import axios from "axios";
import {
  GET_CART_LIST,
  CART_LIST_LOADING,
  ADD_CART,
  REMOVE_CART,
  CONFIRM_CART
} from "./types";

export const setCartsLoading = () => ({
  type: CART_LIST_LOADING
});

export const getCartList = item => dispatch => {
  dispatch(setCartsLoading());
  return axios.post("/api/user/cartlist", item).then(res => {
    dispatch({
      type: GET_CART_LIST,
      payload: res.data
    });
  });
};

export const addCart = item => dispatch => {
  dispatch(setCartsLoading());
  return axios.post("/api/cart", item).then(res => {
    dispatch({
      type: ADD_CART,
      payload: res.data
    });
  });
};

export const confirmCart = item => dispatch =>
  axios.post("/api/cart/confirm", item).then(res =>
    dispatch({
      type: CONFIRM_CART,
      payload: { data: res.data, params: item }
    })
  );

export const removeCart = item => dispatch => {
  dispatch(setCartsLoading());
  return axios.post("/api/user/removecart", item).then(res => {
    dispatch({
      type: REMOVE_CART,
      payload: { data: res.data, params: item }
    });
  });
};
