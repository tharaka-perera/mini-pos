import { LOGIN, CHECK } from '../actions/types'
import { bindActionCreators } from 'redux'

const initialState = {
  message: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        message: action.payload.success
      }
    case CHECK:
      return {
        ...state,
        message: action.payload.message
      }
    default:
      return state
  }
}
