import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import Cart from "./cart";
import CartList from "./CartList";
import NotFound from "./NotFound";
import AppNavBar from "./AppNavBar";
import { loginUser, authCheck } from "../actions/loginAction";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

class AppContainer extends Component {
  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    // const comp = this.props.login.message === true ? <Cart /> : <Login />;
    return (
      <BrowserRouter>
        <React.Fragment>
          {this.props.login.message && <AppNavBar />}
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                this.props.login.message ? (
                  <Redirect to="/cartlist" />
                ) : (
                  <Login />
                )
              }
            />
            ;
            <Route
              exact
              path="/cartlist"
              render={() =>
                this.props.login.message ? <CartList /> : <Login />
              }
            />
            <Route
              exact
              path="/login"
              render={() =>
                this.props.login.message ? <CartList /> : <Login />
              }
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  authCheck: PropTypes.func,
  login: PropTypes.object
};

const mapStateToProps = function(state) {
  return {
    login: state.login
  };
};

export default connect(
  mapStateToProps,
  { loginUser, authCheck }
)(AppContainer);
