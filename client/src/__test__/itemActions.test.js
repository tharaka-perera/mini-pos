import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import regeneratorRuntime from "regenerator-runtime";
import moxios from "moxios";
import * as types from "../actions/types";
import * as actions from "../actions/itemActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("getItems ItemActions", () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it("creates ITEMS_LOADING while fetching data and creates GET_ITEMS after fetching", () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {},
			});
		});

		const expectedActions = [
			{ type: types.ITEMS_LOADING },
			{
				payload: {},
				type: types.GET_ITEMS,
			},
		];

		const store = mockStore({ items: [], loading: false });

		return store.dispatch(actions.getItems()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});

describe("deleteItem ItemActions", () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it("creates DELETE_ITEM after response", () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {},
			});
		});

		const expectedActions = [
			{
				payload: "test",
				type: types.DELETE_ITEM,
			},
		];

		const store = mockStore({ items: [], loading: false });

		return store.dispatch(actions.deleteItem("test")).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});

describe("addItem ItemActions", () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	it("creates ADD_ITEM after response", () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {},
			});
		});

		const expectedActions = [
			{
				payload: {},
				type: types.ADD_ITEM,
			},
		];

		const store = mockStore({ items: [], loading: false });

		return store.dispatch(actions.addItem("test")).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});