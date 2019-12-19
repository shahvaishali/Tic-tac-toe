import React, { Component } from "react";
import Square from "../Square/Square";

export default class Board extends Component {
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

  renderSquare(i) {
    return (
      <Square
        onClick={() => this.changePlayer(i)}
        value={this.state.square[i]}
      />
    );
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
      <>
        {status}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </>
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
