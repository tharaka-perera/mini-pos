import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Cart from './cart'
import { loginUser, authCheck } from '../actions/loginAction'
import PropTypes from 'prop-types'

class AppContainer extends Component {
  componentDidMount () {
    this.props.authCheck()
  }

  render () {
    return this.props.login.message === true ? <Cart /> : <Login />
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  authCheck: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
}

const mapStateToProps = function (state) {
  return {
    login: state.login
  }
}

export default connect(
  mapStateToProps,
  { loginUser, authCheck }
)(AppContainer)
