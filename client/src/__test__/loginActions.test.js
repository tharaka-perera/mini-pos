import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import regeneratorRuntime from 'regenerator-runtime'
import moxios from 'moxios'
import * as types from '../actions/types'
import * as actions from '../actions/loginAction'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('loginUser loginActions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('creates LOGIN after request for response with status code 200', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })

    const expectedActions = [
      {
        payload: { data: {}, success: true },
        type: types.LOGIN
      }
    ]

    const store = mockStore({
      message: '',
      userId: ''
    })

    return store.dispatch(actions.loginUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('authCheck loginActions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('creates CHECK after request and pass recieved payload', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {}
      })
    })

    const expectedActions = [
      {
        payload: {},
        type: types.CHECK
      }
    ]

    const store = mockStore({
      message: '',
      userId: ''
    })

    return store.dispatch(actions.authCheck()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates CHECK after request and returns custom payload', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 400,
        response: {}
      })
    })

    const expectedActions = [
      {
        payload: { message: false },
        type: types.CHECK
      }
    ]

    const store = mockStore({
      message: '',
      userId: ''
    })

    return store.dispatch(actions.authCheck()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
