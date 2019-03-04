import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getCartList, setCartsLoading } from "../actions/cartListActions";
import { getItems } from "../actions/itemActions";
import ItemModal from "./ItemModal";
import AppNavBar from "./AppNavBar";

import PropTypes from "prop-types";
import { stringify } from "querystring";

class CartList extends Component {
  componentDidMount() {
    const item = {
      userId: "5c77c68f072a5f11776492e8"
    };
    this.props.getCartList(item);
  }

  render() {
    const { userId, carts } = this.props.cartList;
    if (!carts) {
      return <div />;
    }
    return (
      <React.Fragment>
        <div>
          {carts.map(({ _id, items }) => (
            <div>{_id}</div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

CartList.propTypes = {
  getCartList: PropTypes.func.isRequired,
  cartList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cartList: state.cartList
});

export default connect(
  mapStateToProps,
  {
    getCartList,
    setCartsLoading
  }
)(CartList);
