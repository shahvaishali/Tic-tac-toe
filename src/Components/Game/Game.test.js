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
  
  clickEvent(wrapper, [0, 1, 4, 5, 8], 'div.square')

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
    const blink = [true, false, false, false, true, false, false, false, true]
    const blinker =  wrapper.find('div.square')
    for(var i = 0; i < blinker.length; i++){
      expect(blinker.at(i).children().hasClass('blink_me')).toEqual(blink[i]);
    }
  })
})

describe('Player 2 win check', () => {
  const wrapper = mount(<Game />)
  
  clickEvent(wrapper, [1, 0, 5, 3, 7, 6], 'div.square')

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
    const blink = [true, false, false, true, false, false, true, false, false]
    const blinker =  wrapper.find('div.square')
    for(var i = 0; i < blinker.length; i++){
      expect(blinker.at(i).children().hasClass('blink_me')).toEqual(blink[i]);
    }
  })
  
})

describe('Tie', () => {
  const wrapper = mount(<Game />)

  clickEvent(wrapper, [0, 4, 1, 2, 6, 3, 5, 7, 8], 'div.square')

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
    const blinker =  wrapper.find('div.square')
    for(var i = 0; i < blinker.length; i++){
      expect(blinker.at(i).hasClass('blink_me')).toEqual(true);
    }
  })
})

describe('Past History', () => {
  const wrapper = mount(<Game />)
  const start = wrapper.find('li').text()

  it('Initial History', () => {
    expect(start).toEqual('Start')
  })

  clickEvent(wrapper, [0, 4, 1, 2, 6, 3, 5, 7], 'div.square')

  const histMoves = wrapper.find('li')
  it('All history button checks', () => {
    checkEvent(histMoves, [0, 1, 2, 3, 4, 5, 6, 7, 8], 
      ['Start', 'Go to move #1', 'Go to move #2', 'Go to move #3', 'Go to move #4', 
      'Go to move #5', 'Go to move #6', 'Go to move #7', 'Go to move #8'])
    expect(histMoves.last().text()).toEqual('Go to move #8')
  })

  wrapper.find('li').at(2).find('button').first().simulate('click')
  const pastMoves = wrapper.find('li')
  it('Click on past move to check if button is working', () => {
    expect(pastMoves.first().text()).toEqual('Start')
    expect(pastMoves.at(1).text()).toEqual('Go to move #1')
    expect(pastMoves.last().text()).toEqual('Go to move #2')
  })
})

describe('History Interoperability tests', () => {
  const wrapper = mount(<Game />)

  clickEvent(wrapper, [0, 4, 1, 2, 6, 3, 5, 7], 'div.square')

  const playerOne = wrapper.find('h5.playerTurn').text()
  
  it("detect player 1's turn", () => {
    expect(playerOne).toEqual('Player 1 (X)')
  });

  wrapper.find('li').at(3).find('button').first().simulate('click')
  
  const playerTwo = wrapper.find('h5.playerTurn').text()
  it("detect player 2's turn", () => {
    expect(playerTwo).toEqual('Player 2 (O)')
  })

  const squareCheck = wrapper.find('div.square')
  it('detect square boxes', () => {
    checkEvent(squareCheck, [0, 4, 1, 2, 6, 3, 5, 7], ['X', 'O', 'X', '', '', '', '', ''])
  })
  
})

describe('Player 2 start move after 1st game', () => {
  const wrapper = mount(<Game />)
  
  // Player 1 wins
  clickEvent(wrapper, [0, 1, 4, 5, 8], 'div.square')
 
  // Reset and start next game
  wrapper.find('div.square').at(8).simulate('click')
  
  const turncheck = wrapper.find('h5.playerTurn')
  it("Detect player 2 starts the game", () => {
    expect(turncheck.text()).toEqual('Player 2 (O)')
  });

  it("Scorechecker after first game", () => {
    expect(wrapper.find('#team1').text()).toEqual('1')
    expect(wrapper.find('#team2').text()).toEqual('0')
  })
})

function clickEvent(wrapper, clicks, tag){
  clicks.forEach((click)=>{
    wrapper.find(tag).at(click).simulate('click')
  })
}

function checkEvent(wrapper, nodes, expected){
  for (var i = 0; i < nodes.length; i++){
    expect(wrapper.at(nodes[i]).text()).toEqual(expected[i])
  }
}