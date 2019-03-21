import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Login from '../components/Login'

const middlewares = [thunk]

Enzyme.configure({ adapter: new Adapter() })

describe('components', () => {
  describe('Login component', () => {
    const mockStore = configureStore(middlewares)
    let store

    const initialState = {
      message: ''
    }

    beforeEach(() => {
      store = mockStore(initialState)
    })
    it('should render self and subcomponents', () => {
      const props = {
        login: jest.fn()
      }
      const wrapper = mount(
        <Provider store={store}>
          <Login {...props} />
        </Provider>
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('simulate button action', () => {
      const props = {
        login: jest.fn()
      }
      const wrapper = mount(
        <Provider store={store}>
          <Login {...props} />
        </Provider>
      )
      expect(wrapper.find('.btnLogin').simulate('click'))
      expect(wrapper.find('.input-email').simulate('change'))
    })
  })
})
