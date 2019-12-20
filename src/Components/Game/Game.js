import React, { Component } from "react";
import Board from "../Board/Board";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      square: Array(9).fill(null),
      playerOne: true
    };
  }
  changePlayer(i) {
    const square = this.state.square.slice();
    if (!checkWinner(square)) {
      square[i] = this.state.playerOne ? "X" : "O";
      this.setState({
        square: square,
        playerOne: !this.state.playerOne
      });
    }
  }
  render() {
    let status;
    const winner = checkWinner(this.state.square);
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.playerOne ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            square={this.state.square}
            onClick={i => {
              this.changePlayer(i);
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function checkWinner(square) {
  let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}
