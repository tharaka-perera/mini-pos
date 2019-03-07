import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCartItems,
  deleteCartItem,
  addCartItem,
  setCartItemsLoading,
  updateCartItem
} from "../actions/cartActions";
import { confirmCart } from "../actions/cartListActions";
import { getItems } from "../actions/itemActions";
import ItemModal from "./ItemModal";
import AppNavBar from "./AppNavBar";

import PropTypes from "prop-types";

class Cart extends Component {
  componentDidMount() {
    //this.props.getCartItems("5c78c0ff8f01aa39dbb9b12b");
    this.props.getItems();
  }

  onDeleteClick = id => {
    const newItem = {
      _id: this.props.cart._id,
      delete: "",
      itm: id
    };
    this.props.deleteCartItem(newItem);
  };

  onUpdate = (id, val) => {
    const newItem = {
      _id: this.props.cart._id,
      itm: id,
      count: val
    };
    // console.log(id, val);
    // add item action
    this.props.updateCartItem(newItem);
  };

  confirmCart(id) {
    const index = this.props.cartList.carts.findIndex(cart => cart._id === id);
    console.log(this.props.cartList.carts[index].confirmed);

    const item = this.props.cartList.carts[index].confirmed
      ? { _id: id, confirmed: false }
      : { _id: id, confirmed: true };
    // console.log(item);
    this.props.confirmCart(item);
  }

  render() {
    const { cartItems, total } = this.props.cart;
    const index = this.props.cartList.carts.findIndex(
      cart => cart._id === this.props.cart._id
    );
    if (!cartItems) {
      return <div />;
    }
    return (
      <React.Fragment>
        <div className="container">
          <ItemModal />
          <div className="card shopping-cart">
            <div className="card-header bg-dark text-light">
              <i className="fa fa-shopping-cart" aria-hidden="true" />
              <span> </span>
              Items in cart
              <div className="clearfix" />
            </div>
            <TransitionGroup className="card-body">
              {/* PRODUCT */}
              {cartItems.map(({ count, itm }) => (
                <CSSTransition classNames="fade" timeout={300} key={itm._id}>
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
                              type="button"
                              defaultValue="+"
                              className="plus"
                              onClick={_id => {
                                if (
                                  document.getElementById(itm._id).value <
                                  itm.availableCount
                                ) {
                                  document.getElementById(itm._id).value++;
                                }
                                this.onUpdate(
                                  itm._id,
                                  document.getElementById(itm._id).value
                                );
                              }}
                            />
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
                            <input
                              type="button"
                              defaultValue="-"
                              className="minus"
                              onClick={_id => {
                                if (
                                  document.getElementById(itm._id).value > 1
                                ) {
                                  document.getElementById(itm._id).value--;
                                }
                                this.onUpdate(
                                  itm._id,
                                  document.getElementById(itm._id).value
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-2 col-sm-2 col-md-2 text-right">
                          <button
                            onClick={this.onDeleteClick.bind(this, itm._id)}
                            type="button"
                            className="btn btn-outline-danger btn-xs"
                          >
                            <i className="fa fa-trash" area-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
            <div className="card-footer">
              <div className="float-right col-12" style={{ margin: "10px" }}>
                {this.props.cartList.carts[index] ? (
                  <button
                    className="btn-cartlist btn-cartlist-confirm"
                    id={"confirmed" + this.props.cart._id}
                    onClick={this.confirmCart.bind(this, this.props.cart._id)}
                  >
                    {!this.props.cartList.carts[index].confirmed ? (
                      <i
                        class="fas fa-circle-notch fa-spin"
                        style={{ marginRight: "8px" }}
                      />
                    ) : (
                      <i />
                    )}
                    {this.props.cartList.carts[index].confirmed
                      ? "Stop processing"
                      : "Confirm cart"}
                  </button>
                ) : (
                  <i />
                )}
                <div
                  className="float-right"
                  style={{ margin: "5px" }}
                  id="total-price"
                >
                  Total price: <b>${Number.parseFloat(total).toFixed(2)}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Cart.propTypes = {
  getCartItems: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  confirmCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart,
  cartList: state.cartList
});

export default connect(
  mapStateToProps,
  {
    getCartItems,
    deleteCartItem,
    addCartItem,
    setCartItemsLoading,
    updateCartItem,
    getItems,
    confirmCart
  }
)(Cart);
