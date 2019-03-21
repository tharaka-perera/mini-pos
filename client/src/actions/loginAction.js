import axios from "axios";
import { LOGIN, CHECK } from "./types";

export const loginUser = item => dispatch => new Promise(((resolve, reject) => {
	return axios
		.post("/api/user/login", item)
		.then((res) => {
			dispatch({
				type: LOGIN,
				payload: { data: res.data, success: true },
			});
			resolve();
		})
		.catch(() => {
			reject();
		});
}));

export const authCheck = () => (dispatch) => {
	return axios
		.get("/api/user/auth")
		.then((res) => {
			dispatch({
				type: CHECK,
				payload: res.data,
			});
		})
		.catch(() => {
			dispatch({
				type: CHECK,
				payload: { message: false },
			});
		});
};
