import {
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCartList,
  setCartsLoading,
  addCart,
  removeCart
} from "../actions/cartListActions";
import { getCartItems } from "../actions/cartActions";
import ItemModal from "./ItemModal";
import AppNavBar from "./AppNavBar";
import Cart from "./cart";

import PropTypes from "prop-types";
import { stringify } from "querystring";

class CartList extends Component {
  state = {
    edit: false,
    modal: false
  };

  componentDidMount() {
    const item = {
      userId: "5c77c68f072a5f11776492e8"
    };
    this.props.getCartList(item);
  }

  editCart(id) {
    this.props.getCartItems(id);
    this.setState({ edit: true });
    this.toggle();
  }

  addCart(id) {
    const item = { userId: id };
    this.props.addCart(item);
  }

  removeCart(id) {
    const item = { _id: "5c77c68f072a5f11776492e8", cart: id };
    this.props.removeCart(item);
  }

  toggle = () => {
    if (this.state.modal) {
      const item = {
        userId: "5c77c68f072a5f11776492e8"
      };
      this.props.getCartList(item);
    }
    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit
    });
  };

  render() {
    const { userId, carts } = this.props.cartList;
    if (!carts) {
      return <div />;
    }
    if (this.state.edit && !this.props.cartList.cartsLoading) {
      return (
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="edit-cart"
        >
          <ModalHeader toggle={this.toggle}>Edit Cart</ModalHeader>
          <ModalBody className="edit-cart-content">
            <Cart />
          </ModalBody>
        </Modal>
      );
    }
    return (
      <React.Fragment>
        <div className="container">
          <div className="row-full">
            <Button
              color="primary"
              id={"item"}
              style={{ marginBottom: "1rem" }}
              onClick={this.addCart.bind(this, userId)}
            >
              Add Cart
            </Button>
            {carts.map(({ _id, items }) => (
              <TransitionGroup
                id="accordion"
                role="tablist"
                aria-multiselectable="true"
                key={"key" + _id}
              >
                <Button
                  color="primary"
                  id={"item" + _id}
                  style={{ marginBottom: "1rem" }}
                >
                  Show Cart
                </Button>
                <Button
                  color="primary"
                  id={"edit" + _id}
                  onClick={this.editCart.bind(this, _id)}
                  style={{ marginBottom: "1rem" }}
                >
                  Edit Cart
                </Button>
                <Button
                  color="primary"
                  id={"remove" + _id}
                  onClick={this.removeCart.bind(this, _id)}
                  style={{ marginBottom: "1rem" }}
                >
                  Remove Cart
                </Button>
                <UncontrolledCollapse toggler={"item" + _id}>
                  <Card>
                    <CardBody>
                      {items.map(({ count, itm }) => (
                        <CSSTransition
                          classNames="fade"
                          timeout={800}
                          key={itm._id}
                        >
                          <div>
                            <div className="row">
                              <div className="col-12 col-sm-12 col-md-2 text-center">
                                <img
                                  className="img-responsive"
                                  src="https://picsum.photos/120/80"
                                  alt={itm.name}
                                  width={120}
                                  height={80}
                                />
                              </div>
                              <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-5">
                                <h4 className="product-name">
                                  <strong>{itm.name}</strong>
                                </h4>
                                <h4>
                                  <small>{itm.description}</small>
                                </h4>
                              </div>
                              <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-1">
                                <small>
                                  {itm.availableCount}
                                  <em> units available</em>
                                </small>
                              </div>
                              <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                                <div
                                  className="col-3 col-sm-3 col-md-6 text-md-right"
                                  style={{ paddingTop: "5px" }}
                                >
                                  <h6>
                                    <strong>
                                      ${Number.parseFloat(itm.price).toFixed(2)}
                                      <span className="text-muted">x</span>
                                    </strong>
                                  </h6>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4">
                                  <div className="quantity">
                                    <input
                                      id={itm._id}
                                      type="number"
                                      step={1}
                                      defaultValue={count}
                                      min={1}
                                      title="Qty"
                                      className="qty"
                                      size={4}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr />
                          </div>
                        </CSSTransition>
                      ))}
                    </CardBody>
                    <div className="card-footer">
                      <div
                        className="float-right col-12"
                        style={{ margin: "10px" }}
                      >
                        <div
                          className="float-right"
                          style={{ margin: "5px" }}
                          id="total-price"
                        >
                          Total price:
                          <b>
                            $
                            {Number.parseFloat(
                              items
                                .map(item => item.itm.price * item.count)
                                .reduce((a, b) => a + b, 0)
                            ).toFixed(2)}
                          </b>
                        </div>
                      </div>
                    </div>
                  </Card>
                </UncontrolledCollapse>
              </TransitionGroup>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CartList.propTypes = {
  getCartList: PropTypes.func.isRequired,
  addCart: PropTypes.func.isRequired,
  removeCart: PropTypes.func.isRequired,
  cartList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cartList: state.cartList
});

export default connect(
  mapStateToProps,
  {
    getCartList,
    getCartItems,
    setCartsLoading,
    addCart,
    removeCart
  }
)(CartList);
