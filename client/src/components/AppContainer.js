import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Login from './Login';
import CartList from './CartList';
import NotFound from './NotFound';
import { loginUser, authCheck } from '../actions/loginAction';

class AppContainer extends Component {
  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <div>
              <div>
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                  >
                    <Switch location={location}>
                      <Route
                        exact
                        path="/"
                        render={() => (this.props.login.message ? (
                          <Redirect to="/cartlist" />
                        ) : (
                            <Redirect to="/login" />
                          ))
                        }
                      />
                      <Route
                        exact
                        path="/login"
                        render={() => (this.props.login.message ? (
                          <Redirect to="/cartlist" />
                        ) : (
                            <Login />
                          ))
                        }
                      />
                      <Route
                        exact
                        path="/cartlist"
                        render={() => (this.props.login.message ? (
                          <CartList />
                        ) : (
                            <Redirect to="/login" />
                          ))
                        }
                      />
                      <Route render={() => <NotFound />} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </div>
          )}
        />
      </BrowserRouter>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  authCheck: PropTypes.func,
  login: PropTypes.object,
};

const mapStateToProps = function (state) {
  return {
    login: state.login,
  };
};

export default connect(
  mapStateToProps,
  { loginUser, authCheck },
)(AppContainer);
