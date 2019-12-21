import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Game from "./Components/Game/Game";

it("should render board component", () => {
  const wrapper = shallow(<App />);
  const game = wrapper.find(Game);
  expect(game.exists()).toBe(true);
});
