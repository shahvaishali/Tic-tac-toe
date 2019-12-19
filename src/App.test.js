import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Board from "./Components/Board/Board";

it("should render board component", () => {
  const wrapper = shallow(<App />);
  const board = wrapper.find(Board);
  expect(board.exists()).toBe(true);
});
