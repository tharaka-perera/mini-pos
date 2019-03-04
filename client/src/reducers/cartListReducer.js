import { GET_CART_LIST, CART_LIST_LOADING } from "../actions/types";
const initialState = {
  userId: "",
  carts: [],
  cartsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART_LIST:
      return {
        ...state,
        carts: action.payload.carts,
        userId: action.payload._id,
        cartsLoading: false
      };
    case CART_LIST_LOADING:
      return {
        ...state,
        cartsLoading: true
      };
    default:
      return state;
  }
}
