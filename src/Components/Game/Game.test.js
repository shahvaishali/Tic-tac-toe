import React from "react";
import Game from "./game";
import { shallow, mount } from "enzyme";

it("renders without crashing", () => {
  shallow(<Game />);
});

describe ('detect player turn', () => {
  const wrapper = mount(<Game />)
  const playerOne = wrapper.find('h5.playerTurn').text()
  it("detect player 1's turn", () => {
    expect(playerOne).toEqual('Player 1 (X)')
  });

  wrapper.find('div.square').first().simulate('click')
  const playerTwo = wrapper.find('h5.playerTurn').text()
  it("detect player 2's turn", () => {
    expect(playerTwo).toEqual('Player 2 (O)')
  });

  wrapper.find('div.square').first().simulate('click')
  it("false turn detection", () => {
    expect(wrapper.find('h5.playerTurn').text()).toEqual('Player 2 (O)')
  });

})

