import axios from "axios";
import {
	GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING,
} from "./types";

export const setItemsLoading = () => ({
	type: ITEMS_LOADING,
});

export const getItems = () => (dispatch) => {
	dispatch(setItemsLoading());
	return axios.get("/api/items").then(res => dispatch({
		type: GET_ITEMS,
		payload: res.data,
	}));
};

export const deleteItem = id => (dispatch) => {
	return axios.delete(`/api/items/${id}`).then(() => dispatch({
		type: DELETE_ITEM,
		payload: id,
	}));
};

export const addItem = item => (dispatch) => {
	return axios.post("/api/items", item).then(res => dispatch({
		type: ADD_ITEM,
		payload: res.data,
	}));
};
