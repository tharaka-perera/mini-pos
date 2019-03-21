import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import regeneratorRuntime from "regenerator-runtime";
import moxios from "moxios";
import * as types from "../actions/types";
import * as actions from "../actions/cartListActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("getCartList cartListActions", () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it("creates CART_LIST_LOADING while fetching data and creates GET_CART_LIST after fetching", () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					_id: "5c6bf6cdd2104b6379fdf49c",
					carts: ["1", "2", "3"],
				},
			});
		});

		const expectedActions = [
			{ type: types.CART_LIST_LOADING },
			{
				payload: {
					_id: "5c6bf6cdd2104b6379fdf49c",
					carts: ["1", "2", "3"],
				},
				type: types.GET_CART_LIST,
			},
		];

		const store = mockStore({ carts: [], userId: "", cartsLoading: false });

		return store.dispatch(actions.getCartList()).then(() => {
			// return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});

describe("removeCart cartListActions", () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it("creates REMOVE_CART after deleting cart and returns payload after fetching", () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {},
			});
		});

		const expectedActions = [
			{ type: types.CART_LIST_LOADING },
			{
				payload: { data: {}, params: { mockParams: "test" } },
				type: types.REMOVE_CART,
			},
		];

		const store = mockStore({ carts: [], userId: "", cartsLoading: false });

		const cart = { mockParams: "test" };

		return store.dispatch(actions.removeCart(cart)).then(() => {
			// return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});

describe("addCart cartListActions", () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it("creates ADD_CART and returns payload after fetching", () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {},
			});
		});

		const expectedActions = [
			{ type: types.CART_LIST_LOADING },
			{
				payload: {},
				type: types.ADD_CART,
			},
		];

		const store = mockStore({ carts: [], userId: "", cartsLoading: false });

		const cart = {};

		return store.dispatch(actions.addCart(cart)).then(() => {
			// return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});


describe("confirmCart cartListActions", () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it("creates CONFIRM_CART and returns payload after fetching", () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {},
			});
		});

		const expectedActions = [
			{
				payload: { data: {}, params: {} },
				type: types.CONFIRM_CART,
			},
		];

		const store = mockStore({ carts: [], userId: "", cartsLoading: false });

		const cart = {};

		return store.dispatch(actions.confirmCart(cart)).then(() => {
			// return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
