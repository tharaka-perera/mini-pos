import axios from "axios";
import { LOGIN, CHECK } from "./types";

export const loginUser = item => dispatch => {
  return new Promise(function(resolve, reject) {
    axios
      .post("/api/user/login", item)
      .then(res => {
        if (res.status === 200) {
          console.log("test1");
          dispatch({
            type: LOGIN,
            payload: { data: res.data, success: true }
          });
          resolve();
        } else {
          dispatch({
            type: LOGIN,
            payload: { data: res.data, success: false }
          });
        }
      })
      .catch(res => {
        reject();
      });
  });
};

export const authCheck = () => dispatch => {
  axios
    .get("/api/user/auth")
    .then(res => {
      dispatch({
        type: CHECK,
        payload: res.data
      });
    })
    .catch(res => {
      dispatch({
        type: CHECK,
        payload: { message: false }
      });
    });
};
