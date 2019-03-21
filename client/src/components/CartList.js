import {
	UncontrolledCollapse,
	Button,
	CardBody,
	Card,
	Modal,
	ModalHeader,
	ModalBody
} from "reactstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getCartList,
	setCartsLoading,
	addCart,
	removeCart,
	confirmCart
} from "../actions/cartListActions";
import { getCartItems } from "../actions/cartActions";
import AppNavBar from "./AppNavBar";
import Cart from "./cart";

import PropTypes from "prop-types";

class CartList extends Component {
	constructor(props) {
		super(props);
		const cookieList = document.cookie ? document.cookie.split("; ") : [];
		const cookies = [];
		let usrID = "";
		cookieList.map(item => {
			cookies.push(item.split("="));
		});
		cookies.map(item => {
			if (item[0] === "user") {
				usrID = decodeURIComponent(item[1])
					.split(":")[1]
					.match(/"([^"]+)"/)[1];
			}
		});
		// console.log(usrID);
		const item = {
			userId: usrID
		};
		this.props.getCartList(item);
		this.state = {
			edit: false,
			modal: false,
			currentCartState: false,
			userID: usrID
		};
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
		const item = { _id: this.props.cartList.userId, cart: id };
		this.props.removeCart(item);
	}

	confirmCart(id) {
		const index = this.props.cartList.carts.findIndex(cart => cart._id === id);
		console.log(this.props.cartList.carts[index].confirmed);

		const item = this.props.cartList.carts[index].confirmed
			? { _id: id, confirmed: false }
			: { _id: id, confirmed: true };
		// console.log(item);
		this.props.confirmCart(item);
	}

	toggle = () => {
		if (this.state.modal) {
			const item = {
				userId: this.state.userID
			};
			console.log("printed item", item);
			this.props.getCartList(item);
		}
		this.setState({
			modal: !this.state.modal,
			edit: !this.state.edit
		});
	};

	render() {
		const { userId, carts } = this.props.cartList;
		if (this.props.cartList.cartsLoading) {
			return (
				<div className="container-loader">
					<svg
						className="loader"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 340 340"
					>
						<circle cx="170" cy="170" r="160" stroke="#1dc8cd" />
						<circle cx="170" cy="170" r="135" stroke="#13567c" />
						<circle cx="170" cy="170" r="110" stroke="#1dc8cd" />
						<circle cx="170" cy="170" r="85" stroke="#13567c" />
					</svg>
				</div>
			);
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
			<div className="browser-outer">
				<section id="call-to-action">
					{this.props.login.message && <AppNavBar />}
				</section>
				{/* #call-to-action */}

				<section id="more-features" className="section-bg">
					<div className="container">
						<div className="section-header">
							<h3 className="section-title">Available Carts</h3>
							<span className="section-divider" />
							<p className="section-description">Select to view and edit</p>
						</div>
						<div className="row">
							{carts.map(({ _id, confirmed, items }, index) => (
								<div className="col-lg-12 collapse-card" key={"cart" + _id}>
									<div className="box wow fadeInLeft collapse-card">
										<div className="icon">
											<i className="fas fa-cart-plus fa-3x" />
										</div>
										<h4 className="title">
											<a>Cart - {index + 1}</a>
										</h4>
										<div className="card-btn-wrapper">
											<button
												className="btn-cartlist btn-show-cart"
												id={"item" + _id}
											>
												Show Cart
											</button>
										</div>
										<UncontrolledCollapse toggler={"item" + _id}>
											<Card>
												<CardBody>
													{items.map(({ count, itm }) => (
														<div key={"item" + itm.productCode}>
															<div className="row">
																<div className="col-12 col-sm-12 col-md-2 text-center">
																	<img
																		className="img-responsive"
																		src={"/items/" + itm.productCode + ".jpg"}
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
																				$
																				{Number.parseFloat(itm.price).toFixed(
																					2
																				)}
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
													))}
												</CardBody>
												<div className="card-footer">
													<div className="container">
														<div className="row">
															<div className="col-8">
																<button
																	className="btn-cartlist"
																	id={"edit" + _id}
																	onClick={this.editCart.bind(this, _id)}
																>
																	Edit Cart
																</button>
																<button
																	className="btn-cartlist btn-cartlist-remove"
																	id={"remove" + _id}
																	onClick={this.removeCart.bind(this, _id)}
																>
																	Remove Cart
																</button>
																<button
																	className="btn-cartlist btn-cartlist-confirm"
																	id={"confirmed" + _id}
																	onClick={this.confirmCart.bind(this, _id)}
																>
																	{!confirmed ? (
																		<i
																			className="fas fa-circle-notch fa-spin"
																			style={{ marginRight: "8px" }}
																		/>
																	) : (
																		<i />
																	)}
																	{confirmed
																		? "Stop processing"
																		: "Confirm cart"}
																</button>
															</div>
															<div className="col-4">
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
																				.map(
																					item => item.itm.price * item.count
																				)
																				.reduce((a, b) => a + b, 0)
																		).toFixed(2)}
																	</b>
																</div>
															</div>
														</div>
													</div>
												</div>
											</Card>
										</UncontrolledCollapse>
									</div>
								</div>
							))}
						</div>
						<button
							className="btn-cartlist btn-add-cart"
							id={"item"}
							style={{ marginBottom: "1rem" }}
							onClick={this.addCart.bind(this, userId)}
						>
							Add Cart
  					</button>
					</div>
				</section>

				{/* <div className="container">
          <div className="row-full">
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
                <Button
                  color="primary"
                  id={"confirmed" + _id}
                  onClick={this.confirmCart.bind(this, _id)}
                  style={{ marginBottom: "1rem" }}
                >
                  Confirm Cart
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
        </div> */}

				{/* #more-features */}
			</div>
		);
	}
}

CartList.propTypes = {
	getCartList: PropTypes.func.isRequired,
	addCart: PropTypes.func.isRequired,
	removeCart: PropTypes.func.isRequired,
	confirmCart: PropTypes.func.isRequired,
	cartList: PropTypes.object.isRequired,
	login: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	cartList: state.cartList,
	login: state.login
});

export default connect(
	mapStateToProps,
	{
		getCartList,
		getCartItems,
		setCartsLoading,
		addCart,
		confirmCart,
		removeCart
	}
)(CartList);
