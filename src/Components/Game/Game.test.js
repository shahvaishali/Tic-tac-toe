import React, { Children } from "react";
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
  const falseDetect = wrapper.find('h5.playerTurn').text()
  it("false turn detection", () => {
    expect(falseDetect).toEqual('Player 2 (O)')
  });

  wrapper.find('div.square').at(5).simulate('click')
  it("toggle detection", () => {
    expect(wrapper.find('h5.playerTurn').text()).toEqual('Player 1 (X)')
  });

})

describe('detect clicks', () => {
  const wrapper = mount(<Game/>)
  const detectNull = wrapper.find('div.square').first().text()
  it('detect empty box', () =>{
     expect(detectNull).toEqual("");
  })

  wrapper.find('div.square').first().simulate('click')
  const firstClick = wrapper.find('div.square').first().text()
  it("detect first click", () =>{
    expect(firstClick).toEqual("X");
  })

  wrapper.find('div.square').first().simulate('click')
  const falseClick = wrapper.find('div.square').first().text()
  it("detect false click", () =>{
    expect(falseClick).toEqual("X");
  })

  wrapper.find('div.square').at(5).simulate('click')
  const secondClick = wrapper.find('div.square').at(5).text()
  it("detect second click", () =>{
    expect(secondClick).toEqual("O");
  })
})

describe('Player 1 win check', () => {
  const wrapper = mount(<Game />)
  
  //Player 1 turn
  wrapper.find('div.square').at(0).simulate('click')
  
  //Player 2 turn
  wrapper.find('div.square').at(1).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(4).simulate('click')
  
  //Player 2 turn
  wrapper.find('div.square').at(5).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(8).simulate('click')
  
  const playerTwo = wrapper.find('div.status').text()
  it("Player 1 winner", () => {
    expect(playerTwo).toEqual('Player X Wins')
  });

  const turncheck = wrapper.find('h5.playerNoTurn')
  it("Detect turn style is removed", () => {
    expect(turncheck.at(0).text()).toEqual('Player 1 (X)')
    expect(turncheck.at(1).text()).toEqual('Player 2 (O)')
  });

  it("Scorechecker", () => {
    expect(wrapper.find('#team1').text()).toEqual('1')
    expect(wrapper.find('#team2').text()).toEqual('0')
  })

})

