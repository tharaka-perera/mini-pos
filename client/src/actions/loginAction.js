import axios from 'axios'
import { LOGIN, CHECK } from './types'

export const loginUser = item => dispatch => {
  axios.post('/api/user/login', item).then(res => {
    if (res.status === 200) {
      dispatch({
        type: LOGIN,
        payload: { data: res.data, success: true }
      })
    } else {
      dispatch({
        type: LOGIN,
        payload: { data: res.data, success: false }
      })
    }
  })
}

export const authCheck = () => dispatch => {
  axios.get('/api/user/auth').then(res => {
    dispatch({
      type: CHECK,
      payload: res.data
    })
  })
}
