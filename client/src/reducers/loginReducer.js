import { LOGIN, CHECK } from "../actions/types";

const initialState = {
	message: "",
	userId: "",
};

export default function (state = initialState, action) {
	switch (action.type) {
	case LOGIN:
		return {
			...state,
			message: action.payload.success,
			userId: action.payload.data.userId,
		};
	case CHECK:
		return {
			...state,
			message: action.payload.message,
		};
	default:
		return state;
	}
}
