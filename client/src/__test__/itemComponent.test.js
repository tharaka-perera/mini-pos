import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ItemModal from "../components/ItemModal";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("../components/shoppingList", () => () => "ShoppingList");

const middlewares = [thunk];

Enzyme.configure({ adapter: new Adapter() });

describe("components", () => {
  describe("ItemModal component", () => {
    const mockStore = configureStore(middlewares);
    let store;

    const initialState = {
      items: [],
      loading: false,
      item: { items: [] },
      cart: []
    };

    beforeEach(() => {
      store = mockStore(initialState);
    });

    it("should render self and subcomponents", () => {
      const wrapper = mount(
        <Provider store={store}>
          <ItemModal />
        </Provider>
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("simulate button action", () => {
      const wrapper = mount(
        <Provider store={store}>
          <ItemModal />
        </Provider>
      );
      expect(wrapper.find("button").simulate("click"));
    });
  });
});
