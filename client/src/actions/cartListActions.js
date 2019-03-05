import axios from "axios";
import {
  GET_CART_LIST,
  CART_LIST_LOADING,
  ADD_CART,
  REMOVE_CART
} from "./types";

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

export const removeCart = item => dispatch => {
  dispatch(setCartsLoading());
  return axios.post("/api/user/removecart", item).then(res => {
    dispatch({
      type: REMOVE_CART,
      payload: { data: res.data, params: item }
    });
  });
};

export const setCartsLoading = () => {
  return {
    type: CART_LIST_LOADING
  };
};
