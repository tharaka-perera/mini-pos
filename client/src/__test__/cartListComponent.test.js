import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CartList from "../components/CartList";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const middlewares = [thunk];

Enzyme.configure({ adapter: new Adapter() });

describe("components", () => {
  describe("CartList component", () => {
    const mockStore = configureStore(middlewares);
    let store;

    const initialState = {
      cartList: {
        userId: "1",
        carts: [
          {
            _id: "2",
            confirmed: true,
            items: [
              {
                _id: "3",
                itm: {
                  _id: "4",
                  name: "Coke",
                  productCode: 2,
                  price: 100,
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis metus dolor, at mollis ",
                  availableCount: 500
                },
                count: 5
              }
            ]
          }
        ],
        cartsLoading: false
      },
      login: { message: true }
    };

    beforeEach(() => {
      store = mockStore(initialState);
    });
    fit("should render self and subcomponents", () => {
      const wrapper = mount(
        <Provider store={store}>
          <CartList />
        </Provider>
      );
      //   expect(wrapper).toMatchSnapshot();
    });

    it("simulate button action", () => {
      const wrapper = mount(
        <Provider store={store}>
          <CartList />
        </Provider>
      );
      //   console.log(wrapper.find("input").debug());
      //   expect(wrapper.find(".input-email").simulate("change"));
    });
  });
});
