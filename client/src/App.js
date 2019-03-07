import React, { Component } from "react";
import "./css/App.css";
import "./css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/shoppingList";
import Cart from "./components/cart";
import CartList from "./components/CartList";
import { Provider } from "react-redux";
import store from "./store";
import ItemModal from "./components/ItemModal";
import AppContainer from "./components/AppContainer";
import { Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

class App extends Component {
  componentDidMount() {
    console.log("test");
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
        {/* <CartList /> */}

        {/* <AppNavBar />
            <Container>
              <Login />
              <ItemModal />
              <ShoppingList />
              <Cart />
            </Container> */}
      </Provider>
    );
  }
}

export default App;
