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
import { CSSTransition, TransitionGroup } from "react-transition-group";

class AppContainer extends Component {
  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    // const comp = this.props.login.message === true ? <Cart /> : <Login />;
    return (
      // <BrowserRouter>
      //   <Route
      //     render={({ location }) => (
      //       <React.Fragment>
      //         <TransitionGroup>
      //           <CSSTransition
      //             classNames="fade"
      //             timeout={1000}
      //             key={location.key}
      //           >
      //             {/* {this.props.login.message && <AppNavBar />} */}
      //             {/* #intro */}
      //             <Switch location={location}>
      //               <Route
      //                 exact
      //                 path="/"
      //                 render={() =>
      //                   this.props.login.message ? (
      //                     <Redirect to="/cartlist" />
      //                   ) : (
      //                     <Login />
      //                   )
      //                 }
      //               />
      //               <Route
      //                 exact
      //                 path="/cartlist"
      //                 render={() =>
      //                   this.props.login.message ? <CartList /> : <Login />
      //                 }
      //               />
      //               <Route
      //                 exact
      //                 path="/login"
      //                 render={() =>
      //                   this.props.login.message ? <CartList /> : <Login />
      //                 }
      //               />
      //               <Route path="*" component={NotFound} />
      //             </Switch>
      //           </CSSTransition>
      //         </TransitionGroup>
      //       </React.Fragment>
      //     )}
      //   />
      // </BrowserRouter>

      <BrowserRouter>
        <Route
          render={({ location }) => (
            <div>
              {/* <Route
                exact
                path="/"
                render={() =>
                  this.props.login.message ? (
                    <Redirect to="/cartlist" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/cartlist"
                render={() =>
                  this.props.login.message ? (
                    <Redirect to="/cartlist" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/login"
                render={() =>
                  this.props.login.message ? (
                    <Redirect to="/cartlist" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              /> */}

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
                        render={() =>
                          this.props.login.message ? (
                            <Redirect to="/cartlist" />
                          ) : (
                            <Redirect to="/login" />
                          )
                        }
                      />
                      <Route
                        exact
                        path="/login"
                        render={() =>
                          this.props.login.message ? (
                            <Redirect to="/cartlist" />
                          ) : (
                            <Login />
                          )
                        }
                      />
                      <Route
                        exact
                        path="/cartlist"
                        render={() =>
                          this.props.login.message ? (
                            <CartList />
                          ) : (
                            <Redirect to="/login" />
                          )
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
