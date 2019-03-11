import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../components/NotFound";
import NotFound from "../components/NotFound";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<NotFound />);
});

function setup() {
  const props = {
    NotFound: jest.fn()
  };

  const enzymeWrapper = shallow(<NotFound />);

  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("NotFound component", () => {
    it("should render self and subcomponents", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find("div").text()).toBe("Page not found.! ");
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
