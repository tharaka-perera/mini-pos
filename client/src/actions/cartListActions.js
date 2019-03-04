import axios from "axios";
import { GET_CART_LIST, CART_LIST_LOADING } from "./types";

export const getCartList = item => dispatch => {
  dispatch(setCartsLoading());
  return axios.post("/api/user/cartlist", item).then(res => {
    dispatch({
      type: GET_CART_LIST,
      payload: res.data
    });
  });
};

export const setCartsLoading = () => {
  return {
    type: CART_LIST_LOADING
  };
};
