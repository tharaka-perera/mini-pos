import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";
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
            <div
              id="accordion"
              className="container"
              role="tablist"
              aria-multiselectable="true"
            >
              <Button
                color="primary"
                id={"item" + _id}
                style={{ marginBottom: "1rem" }}
              >
                Toggle
              </Button>
              <UncontrolledCollapse toggler={"item" + _id}>
                <Card>
                  <CardBody>
                    {items.map(({ count, itm }) => (
                      <CSSTransition classNames="fade" timeout={300}>
                        <div key={itm._id}>
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
                </Card>
              </UncontrolledCollapse>
            </div>
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
