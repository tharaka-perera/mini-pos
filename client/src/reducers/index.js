import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import cartReducer from "./cartReducer";
import loginReducer from "./loginReducer";
import cartListReducer from "./cartListReducer";

export default combineReducers({
	item: itemReducer,
	cart: cartReducer,
	login: loginReducer,
	cartList: cartListReducer,
});
