import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { Transition, TransitionGroup } from "react-transition-group";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../actions/itemActions";
import { addCartItem } from "../actions/cartActions";

import PropTypes from "prop-types";

class ShoppingList extends Component {
	state = {
		inCart: []
	};

	componentDidMount() {
		const { cartItems } = this.props.cart;
		const itemArray = [];
		cartItems.map(({ itm }) => {
			itemArray.push(itm.productCode);
		});
		this.setState({ inCart: itemArray }, () => {
			// console.log(this.state.inCart);
			var ls = document.getElementsByClassName("comp");

			for (var i = 0; i < ls.length; i++) {
				this.state.inCart.map(code => {
					if (code == ls[i].getAttribute("data-key"))
						ls[i].classList.add("disabled");
				});
				// if (ls[i].getAttribute("data-key") in this.state.inCart) {
				//   ls[i].classList.add("disabled");
				//   console.log("key", ls[i].getAttribute("data-key"));
				// }
			}
		});

		// console.log(ls);
		// console.log(this.state.inCart);
	}

	handleClickPlus = count => {
		if (document.getElementById("qty").value < count) {
			document.getElementById("qty").value++;
		}
	};

	handleClickMinus = count => {
		if (document.getElementById("qty").value !== 0) {
			document.getElementById("qty").value--;
		}
	};

	addToCart = (
		id,
		val,
		name,
		productCode,
		price,
		description,
		availableCount
	) => {
		const newItem = {
			_id: this.props.cart._id,
			itm: id,
			count: val,
			name: name,
			productCode: productCode,
			price: price,
			description: description,
			availableCount: availableCount
		};
		// add item action
		this.props.addCartItem(newItem);

		this.setState({ inCart: [...this.state.inCart, productCode] }, () => {
			var ls = document.getElementsByClassName("comp");

			for (var i = 0; i < ls.length; i++) {
				if (ls[i].getAttribute("data-key") == productCode)
					ls[i].classList.add("disabled");
			}
		});
		// console.log(this.state.inCart);
	};

	render() {
		const { items } = this.props.item;

		// console.log("old", items);
		return (
			<React.Fragment>
				<div className="container">
					<div className="card shopping-cart">
						<div className="card-header bg-dark text-light">
							<i className="fa fa-shopping-bag" area-hidden="true" />
							<span> </span>
							Item List
  						<div className="clearfix" />
						</div>
						<div className="row item-list-top">
							{/* PRODUCT */}
							{items.map(
								({
									_id,
									name,
									productCode,
									price,
									description,
									availableCount
								}) => (
									// new component
									<div className={"col-md-4"} key={productCode}>
										<figure
											className="card card-product comp"
											data-key={productCode}
										>
											<div className="img-wrap">
												<img src={"/items/" + productCode + ".jpg"} />
											</div>
											<figcaption className="info-wrap">
												<h4 className="title">{name}</h4>
												<p className="desc">{description}</p>
												<div className="row">
													<div className="rating-wrap col-6">
														<div className="label-rating">
															<small>{availableCount} units available</small>{" "}
														</div>
													</div>
													<div className="col-6">
														<div className="quantity float-right">
															<input
																type="button"
																defaultValue="+"
																className="plus"
																onClick={_id => {
																	if (
																		document.getElementById(productCode).value <
																			availableCount
																	) {
																		document.getElementById(productCode)
																			.value++;
																	}
																}}
															/>
															<input
																id={productCode}
																type="number"
																step={1}
																defaultValue={1}
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
																		document.getElementById(productCode).value >
																			1
																	) {
																		document.getElementById(productCode)
																			.value--;
																	}
																}}
															/>
														</div>
													</div>
												</div>
											</figcaption>
											<div className="bottom-wrap">
												<button
													className="btn btn-sm btn-primary float-right"
													onClick={() => {
														this.addToCart(
															_id,
															document.getElementById(productCode).value,
															name,
															productCode,
															price,
															description,
															availableCount
														);
													}}
												>
														Order Now
  											</button>
												<div className="price-wrap h5">
													<span className="price-new">
															${Number.parseFloat(price).toFixed(2)}
													</span>{" "}
												</div>
											</div>
										</figure>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	cart: state.cart
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem, addItem, addCartItem }
)(ShoppingList);
