import {
  GET_CART,
  ADD_CART_ITEM,
  UPDATE_CART_ITEM,
  DELETE_CART_ITEM,
  CART_ITEMS_LOADING,
} from '../actions/types';

const initialState = {
  cartItems: [],
  total: 0,
  cartLoading: false,
  _id: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      var sum = 0;
      action.payload.items.map((k) => {
        sum = Number.parseFloat(k.itm.price).toFixed(2) * Number.parseInt(k.count)
          + sum;
      });
      // console.log(sum);
      return {
        ...state,
        total: sum,
        cartItems: action.payload.items,
        cartLoading: false,
        _id: action.payload._id,
      };
    case DELETE_CART_ITEM:
      var sum2 = 0;
      var cartTemp = state.cartItems.filter(
        obj => obj.itm._id !== action.payload.params.itm,
      );
      cartTemp.map((k) => {
        sum2 = Number.parseFloat(k.itm.price).toFixed(2) * Number.parseInt(k.count)
          + sum2;
      });
      return {
        ...state,
        cartItems: cartTemp,
        total: sum2,
      };
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [
          {
            itm: {
              _id: action.payload.itemData.itm,
              name: action.payload.itemData.name,
              productCode: action.payload.itemData.productCode,
              price: action.payload.itemData.price,
              description: action.payload.itemData.description,
              availableCount: action.payload.itemData.availableCount,
            },
            count: action.payload.itemData.count,
          },
          ...state.cartItems,
        ],
        total:
          state.total
          + Number.parseFloat(action.payload.itemData.price).toFixed(2)
          * Number.parseInt(action.payload.itemData.count),
      };
    case UPDATE_CART_ITEM:
      var sum3 = 0;
      state.cartItems.map((obj) => {
        if (obj.itm._id === action.payload.params.itm) {
          obj.count = action.payload.params.count;
        }
      });
      state.cartItems.map((k) => {
        sum3 = Number.parseFloat(k.itm.price).toFixed(2) * Number.parseInt(k.count)
          + sum3;
      });
      return {
        ...state,
        total: sum3,
      };
    case CART_ITEMS_LOADING:
      return {
        ...state,
        cartLoading: true,
      };
    default:
      return state;
  }
}
