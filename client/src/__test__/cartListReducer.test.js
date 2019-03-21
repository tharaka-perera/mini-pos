import reducer from "../reducers/cartListReducer";
import * as types from "../actions/types";

describe("cartList reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			userId: "",
			carts: [],
			cartsLoading: false,
		});
	});

	it("should handle GET_CART", () => {
		const getCartListAction = {
			type: types.GET_CART_LIST,
			payload: {
				_id: "1",
				carts: ["10", "20", "30"],
			},
		};
		expect(reducer([], getCartListAction)).toEqual({
			carts: ["10", "20", "30"],
			userId: "1",
			cartsLoading: false,
		});

		const getCartAction2 = {
			type: types.GET_CART_LIST,
			payload: {
				_id: "2",
				carts: ["10", "20", "30", "40"],
			},
		};

		expect(
			reducer(
				{
					carts: ["10", "20", "30"],
					userId: "1",
					cartsLoading: false,
				},
				getCartAction2,
			),
		).toEqual(
			{
				carts: ["10", "20", "30", "40"],
				userId: "2",
				cartsLoading: false,
			},
			{
				carts: ["10", "20", "30"],
				userId: "1",
				cartsLoading: false,
			},
		);
	});

	it("should handle REMOVE_CART", () => {
		const removeCartAction = {
			type: types.REMOVE_CART,
			payload: {
				data: "",
				params: {
					cart: "10",
				},
			},
		};

		expect(
			reducer(
				{
					carts: [{ _id: "10" }, { _id: "20" }, { _id: "30" }],
					userId: "2",
					cartsLoading: false,
				},
				removeCartAction,
			),
		).toEqual(
			{
				carts: [{ _id: "20" }, { _id: "30" }],
				userId: "2",
				cartsLoading: false,
			},
			{
				carts: [{ _id: "10" }, { _id: "20" }, { _id: "30" }],
				userId: "2",
				cartsLoading: false,
			},
		);
	});

	it("should handle CONFIRM_CART", () => {
		const confirmCartAction = {
			type: types.CONFIRM_CART,
			payload: {
				data: "",
				params: {
					_id: "30",
					confirmed: true,
				},
			},
		};

		expect(
			reducer(
				{
					carts: [
						{ _id: "10", confirmed: false },
						{ _id: "20", confirmed: true },
						{ _id: "30", confirmed: false },
					],
					userId: "2",
					cartsLoading: false,
				},
				confirmCartAction,
			),
		).toEqual(
			{
				carts: [
					{ _id: "10", confirmed: false },
					{ _id: "20", confirmed: true },
					{ _id: "30", confirmed: true },
				],
				userId: "2",
				cartsLoading: false,
			},
			{
				carts: [
					{ _id: "10", confirmed: false },
					{ _id: "20", confirmed: true },
					{ _id: "30", confirmed: false },
				],
				userId: "2",
				cartsLoading: false,
			},
		);
	});

	it("should handle CART_LIST_LOADING", () => {
		expect(
			reducer(
				{
					total: 160,
					cartItems: [
						{ itm: { _id: "1", price: 50 }, count: 2 },
						{ itm: { _id: "2", price: 20 }, count: 3 },
					],
					cartsLoading: false,
					_id: "12",
				},
				{
					type: types.CART_LIST_LOADING,
				},
			),
		).toEqual(
			{
				total: 160,
				cartItems: [
					{ itm: { _id: "1", price: 50 }, count: 2 },
					{ itm: { _id: "2", price: 20 }, count: 3 },
				],
				cartsLoading: true,
				_id: "12",
			},
			{
				total: 160,
				cartItems: [
					{ itm: { _id: "1", price: 50 }, count: 2 },
					{ itm: { _id: "2", price: 20 }, count: 3 },
				],
				cartsLoading: false,
				_id: "12",
			},
		);
	});
});
