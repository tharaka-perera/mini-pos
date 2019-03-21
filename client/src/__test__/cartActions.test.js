import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import regeneratorRuntime from 'regenerator-runtime'
import moxios from 'moxios'
import * as types from '../actions/types'
import * as actions from '../actions/cartActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getCartItems cartActions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('creates CART_ITEMS_LOADING while fetching data and creates GET_CART after fetching', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          _id: '5c6bf6cdd2104b6379fdf49c',
          items: [
            {
              _id: '5c6e3f2ccd583f2bd04e55cc',
              itm: {
                _id: '5c67bb90f004c93ecd7006bf',
                name: 'Coke',
                productCode: 2,
                price: 100,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 500,
                __v: 0
              },
              count: 1
            },
            {
              _id: '5c6e3fbc461b152d009ba691',
              itm: {
                _id: '5c67bd07f004c93ecd7006c6',
                name: 'Ice Cream',
                productCode: 9,
                price: 120,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 170,
                __v: 0
              },
              count: 1
            },
            {
              _id: '5c6e5d167d83b649d32e3c0c',
              itm: {
                _id: '5c67bbc7f004c93ecd7006c0',
                name: 'Apple',
                productCode: 3,
                price: 80,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 600,
                __v: 0
              },
              count: 4
            },
            {
              _id: '5c6fce27dedd73364924ed67',
              itm: {
                _id: '5c67bc01f004c93ecd7006c2',
                name: 'Milk',
                productCode: 5,
                price: 200,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 400,
                __v: 0
              },
              count: 4
            },
            {
              _id: '5c7379de4316081c7de67208',
              itm: {
                _id: '5c67bc28f004c93ecd7006c3',
                name: 'Cheese',
                productCode: 6,
                price: 350,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 70,
                __v: 0
              },
              count: 1
            }
          ],
          __v: 51
        }
      })
    })

    const expectedActions = [
      { type: types.CART_ITEMS_LOADING },
      {
        payload: {
          _id: '5c6bf6cdd2104b6379fdf49c',
          items: [
            {
              _id: '5c6e3f2ccd583f2bd04e55cc',
              itm: {
                _id: '5c67bb90f004c93ecd7006bf',
                name: 'Coke',
                productCode: 2,
                price: 100,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 500,
                __v: 0
              },
              count: 1
            },
            {
              _id: '5c6e3fbc461b152d009ba691',
              itm: {
                _id: '5c67bd07f004c93ecd7006c6',
                name: 'Ice Cream',
                productCode: 9,
                price: 120,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 170,
                __v: 0
              },
              count: 1
            },
            {
              _id: '5c6e5d167d83b649d32e3c0c',
              itm: {
                _id: '5c67bbc7f004c93ecd7006c0',
                name: 'Apple',
                productCode: 3,
                price: 80,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 600,
                __v: 0
              },
              count: 4
            },
            {
              _id: '5c6fce27dedd73364924ed67',
              itm: {
                _id: '5c67bc01f004c93ecd7006c2',
                name: 'Milk',
                productCode: 5,
                price: 200,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 400,
                __v: 0
              },
              count: 4
            },
            {
              _id: '5c7379de4316081c7de67208',
              itm: {
                _id: '5c67bc28f004c93ecd7006c3',
                name: 'Cheese',
                productCode: 6,
                price: 350,
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ',
                availableCount: 70,
                __v: 0
              },
              count: 1
            }
          ],
          __v: 51
        },
        type: types.GET_CART
      }
    ]

    const store = mockStore({ cartItems: [], total: 0, cartLoading: false })

    return store.dispatch(actions.getCartItems()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('deleteCartItem cartActions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('creates DELETE_CART_ITEM after deleting item and returns payload after fetching', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { success: true }
      })
    })

    const expectedActions = [
      {
        payload: {
          data: {
            success: true
          },
          params: {
            _id: '5c6bf6cdd2104b6379fdf49c',
            delete: '',
            itm: '5c6bf6cdd2104b6379fdf49c'
          }
        },
        type: types.DELETE_CART_ITEM
      }
    ]

    const store = mockStore({ cartItems: [], total: 0, cartLoading: false })

    const newItem = {
      _id: '5c6bf6cdd2104b6379fdf49c',
      delete: '',
      itm: '5c6bf6cdd2104b6379fdf49c'
    }

    return store.dispatch(actions.deleteCartItem(newItem)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('addCartItem cartActions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('creates ADD_CART_ITEM after fetching item and returns payload after fetching', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { modification: 'modmod' }
      })
    })

    const expectedActions = [
      {
        payload: {
          response: {
            modification: 'modmod'
          },
          itemData: {
            _id: '5c6bf6cdd2104b6379fdf49c',
            delete: '',
            itm: '5c6bf6cdd2104b6379fdf49c'
          }
        },
        type: types.ADD_CART_ITEM
      }
    ]

    const store = mockStore({ cartItems: [], total: 0, cartLoading: false })

    const newItem = {
      _id: '5c6bf6cdd2104b6379fdf49c',
      delete: '',
      itm: '5c6bf6cdd2104b6379fdf49c'
    }

    return store.dispatch(actions.addCartItem(newItem)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('updateCartItem cartActions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('creates UPDATE_CART_ITEM after updating item and returns payload after fetching', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { update: 'itemUpdated' }
      })
    })

    const expectedActions = [
      {
        payload: {
          data: {
            update: 'itemUpdated'
          },
          params: {
            _id: '5c6bf6cdd2104b6379fdf49c',
            delete: '',
            itm: '5c6bf6cdd2104b6379fdf49c'
          }
        },
        type: types.UPDATE_CART_ITEM
      }
    ]

    const store = mockStore({ cartItems: [], total: 0, cartLoading: false })

    const newItem = {
      _id: '5c6bf6cdd2104b6379fdf49c',
      delete: '',
      itm: '5c6bf6cdd2104b6379fdf49c'
    }

    return store.dispatch(actions.updateCartItem(newItem)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
