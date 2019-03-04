import {
  GET_CART,
  ADD_CART_ITEM,
  UPDATE_CART_ITEM,
  DELETE_CART_ITEM,
  CART_ITEMS_LOADING
} from '../actions/types'

const initialState = {
  cartItems: [],
  total: 0,
  cartLoading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      var sum = 0
      action.payload.map(k => {
        sum =
          Number.parseFloat(k.itm.price).toFixed(2) * Number.parseInt(k.count) +
          sum
      })
      // console.log(sum);
      return {
        ...state,
        total: sum,
        cartItems: action.payload,
        cartLoading: false
      }
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          obj => obj.itm._id !== action.payload.params.itm
        )
      }
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
              availableCount: action.payload.itemData.availableCount
            },
            count: action.payload.itemData.count
          },
          ...state.cartItems
        ]
      }
    case UPDATE_CART_ITEM:
      var sum = 0
      state.cartItems.map(obj => {
        // console.log("obj", obj);
        // console.log("params", action.payload.params);
        if (obj.itm._id === action.payload.params.itm) {
          obj.count = action.payload.params.count
          // console.log("inside");
        }
      })
      // console.log(state.cartItems);
      state.cartItems.map(k => {
        sum =
          Number.parseFloat(k.itm.price).toFixed(2) * Number.parseInt(k.count) +
          sum
      })
      console.log(state.cartItems)
      return {
        ...state,
        total: sum
        // cartItems: state.items.filter()
      }
    case CART_ITEMS_LOADING:
      return {
        ...state,
        cartLoading: true
      }
    default:
      return state
  }
}
