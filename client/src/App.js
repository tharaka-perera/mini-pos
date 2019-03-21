import React from "react";
import "./css/App.css";
import "./css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import AppContainer from "./components/AppContainer";

function App () {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
