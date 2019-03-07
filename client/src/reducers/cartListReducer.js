import {
  GET_CART_LIST,
  CART_LIST_LOADING,
  ADD_CART,
  REMOVE_CART,
  CONFIRM_CART
} from "../actions/types";
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
    case ADD_CART:
      const ids = state.carts.map(cart => cart._id);
      return {
        ...state,
        carts: [
          ...state.carts,
          {
            _id: action.payload.carts.filter(x => !ids.includes(x))[0],
            items: []
          }
        ],
        cartsLoading: false
      };
    case REMOVE_CART:
      console.log(action.payload.params);
      return {
        ...state,
        carts: state.carts.filter(
          obj => obj._id !== action.payload.params.cart
        ),
        cartsLoading: false
      };
    case CONFIRM_CART:
      const index = state.carts.findIndex(
        cart => cart._id === action.payload.params._id
      );
      console.log(index);
      return {
        ...state,
        carts: state.carts.map((cart, i) =>
          i === index
            ? { ...cart, confirmed: action.payload.params.confirmed }
            : cart
        )
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
