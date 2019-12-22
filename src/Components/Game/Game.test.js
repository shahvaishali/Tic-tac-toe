import React from "react";
import Game from "./game";
import { shallow, mount } from "enzyme";

it("renders without crashing", () => {
  shallow(<Game />);
});

it("detect player 1's turn", () => {
  const wrapper = mount(<Game />)
  const playerOne = wrapper.find('h5.playerTurn').text()
  expect(playerOne).toEqual('Player 1 (X)')
});