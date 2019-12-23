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
  
  const playerOne = wrapper.find('div.status').text()
  it("Player 1 winner", () => {
    expect(playerOne).toEqual('Player X Wins')
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

  it("Blinker", () => {
    expect(wrapper.find('div.square').at(0).children().hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(1).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(2).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(3).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(4).children().hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(5).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(6).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(7).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(8).children().hasClass('blink_me')).toEqual(true);
  })
})

describe('Player 2 win check', () => {
  const wrapper = mount(<Game />)
  
  //Player 1 turn
  wrapper.find('div.square').at(1).simulate('click')
  
  //Player 2 turn
  wrapper.find('div.square').at(0).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(5).simulate('click')
  
  //Player 2 turn
  wrapper.find('div.square').at(3).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(7).simulate('click')

  //Player 2 turn
  wrapper.find('div.square').at(6).simulate('click')

  const playerTwo = wrapper.find('div.status').text()
  it("Player 2 winner", () => {
    expect(playerTwo).toEqual('Player O Wins')
  });

  const turncheck = wrapper.find('h5.playerNoTurn')
  it("Detect turn style is removed", () => {
    expect(turncheck.at(0).text()).toEqual('Player 1 (X)')
    expect(turncheck.at(1).text()).toEqual('Player 2 (O)')
  });

  it("Scorechecker", () => {
    expect(wrapper.find('#team1').text()).toEqual('0')
    expect(wrapper.find('#team2').text()).toEqual('1')
  })

  it("Blinker", () => {
    expect(wrapper.find('div.square').at(0).children().hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(1).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(2).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(3).children().hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(4).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(5).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(6).children().hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(7).children().hasClass('blink_me')).toEqual(false);
    expect(wrapper.find('div.square').at(8).children().hasClass('blink_me')).toEqual(false);
  })
})

describe('Tie', () => {
  const wrapper = mount(<Game />)
  
  //Player 1 turn
  wrapper.find('div.square').at(0).simulate('click')
  
  //Player 2 turn
  wrapper.find('div.square').at(4).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(1).simulate('click')
  
  //Player 2 turn
  wrapper.find('div.square').at(2).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(6).simulate('click')

  //Player 2 turn
  wrapper.find('div.square').at(3).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(5).simulate('click')

  //Player 2 turn
  wrapper.find('div.square').at(7).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(8).simulate('click')

  const tieDisplay = wrapper.find('div.status').text()
  it("Tie display", () => {
    expect(tieDisplay).toEqual('X/O draw!!')
  });

  const turncheck = wrapper.find('h5.playerNoTurn')
  it("Detect turn style is removed", () => {
    expect(turncheck.at(0).text()).toEqual('Player 1 (X)')
    expect(turncheck.at(1).text()).toEqual('Player 2 (O)')
  });

  it("Scorechecker", () => {
    expect(wrapper.find('#team1').text()).toEqual('0')
    expect(wrapper.find('#team2').text()).toEqual('0')
  })

  it("Blinker", () => {
    expect(wrapper.find('div.square').at(0).hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(1).hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(2).hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(3).hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(4).hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(5).hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(6).hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(7).hasClass('blink_me')).toEqual(true);
    expect(wrapper.find('div.square').at(8).hasClass('blink_me')).toEqual(true);
  })
})

describe('Past History', () => {
  const wrapper = mount(<Game />)
  const start = wrapper.find('li').text()

  it('Initial History', () => {
    expect(start).toEqual('Start')
  })

  //Player 1 turn
  wrapper.find('div.square').at(0).simulate('click')
  
  //Player 2 turn
  wrapper.find('div.square').at(4).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(1).simulate('click')
  
  //Player 2 turn
  wrapper.find('div.square').at(2).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(6).simulate('click')

  //Player 2 turn
  wrapper.find('div.square').at(3).simulate('click')

  //Player 1 turn
  wrapper.find('div.square').at(5).simulate('click')

  //Player 2 turn
  wrapper.find('div.square').at(7).simulate('click')
  
  it('All history button checks', () => {
    expect(wrapper.find('li').first().text()).toEqual('Start')
    expect(wrapper.find('li').at(1).text()).toEqual('Go to move #1')
    expect(wrapper.find('li').at(2).text()).toEqual('Go to move #2')
    expect(wrapper.find('li').at(3).text()).toEqual('Go to move #3')
    expect(wrapper.find('li').at(4).text()).toEqual('Go to move #4')
    expect(wrapper.find('li').at(5).text()).toEqual('Go to move #5')
    expect(wrapper.find('li').at(6).text()).toEqual('Go to move #6')
    expect(wrapper.find('li').at(7).text()).toEqual('Go to move #7')
    expect(wrapper.find('li').at(8).text()).toEqual('Go to move #8')
  })
})