import React, { Component } from "react";
import Board from "../Board/Board";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ square: Array(9).fill(null) }],
      playerOne: true
    };
  }
  changePlayer(i) {
    const history = this.state.history;
    const currentSquare = history[history.length - 1];
    const square = currentSquare.square.slice();
    if (!checkWinner(square)) {
      square[i] = this.state.playerOne ? "X" : "O";
      this.setState({
        playerOne: !this.state.playerOne,
        history: history.concat([{ square: square }])
      });
    }
  }
  render() {
    const history = this.state.history;
    const currentSquare = history[history.length - 1];
    const square = currentSquare.square;

    const steps = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button>{desc}</button>
        </li>
      );
    });
    let status;
    const winner = checkWinner(square);
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.playerOne ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            square={square}
            onClick={i => {
              this.changePlayer(i);
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{steps}</ol>
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
