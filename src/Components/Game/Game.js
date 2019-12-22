import React, { Component } from "react";
import Board from "../Board/Board";
import { checkWinner } from "../../lib/checkwinner";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ square: Array(9).fill(null) }],
      playerOne: true,
      stepNum: 0
    };
  }
  changePlayer(i) {
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const currentSquare = history[this.state.stepNum];
    const square = currentSquare.square.slice();
    if (this.state.stepNum <= 8 && !checkWinner(square) && !square[i]) {
      square[i] = this.state.playerOne ? "X" : "O";
      this.setState({
        playerOne: !this.state.playerOne,
        history: history.concat([{ square: square }]),
        stepNum: this.state.stepNum + 1
      });
    }
  }
  jumpTo(step) {
    this.setState({
      stepNum: step,
      history: this.state.history.slice(0, step + 1),
      playerOne: step % 2 === 0
    });
  }

  gameReset() {
    this.setState({
      playerOne: true,
      history: this.state.history.slice(0, 1),
      stepNum: 0
    });
  }
  render() {
    const history = this.state.history;
    const currentSquare = history[this.state.stepNum];
    const square = currentSquare.square;

    const steps = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button  className="btn btn-info mb-1" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    const winner = checkWinner(square);
    if (winner) {
      status = "The winner is : " + winner;
    } else if (this.state.stepNum > 8) {
      status = "It's a tie!";
    } else {
      status = "Next player is : " + (this.state.playerOne ? "X" : "O");
    }

    return (
      <>
      <div className="row justify-content-md-center">
        <div className="col col-3 mt-4">
        <h1>Tic Tac Toe</h1>
        </div>
      </div>
        <div className="row justify-content-end mt-3">
          <div className="col-4 mt-4">
            <Board
               square={square}
              onClick={i => {
                this.changePlayer(i);
              }}
            />
            <div className="co-12 mt-4">
            <button className="btn btn-info" onClick={() => this.gameReset()}>RESET</button>
            <div>{status}</div>
            </div>
          </div>
          <div className="col-4 mt-4">
            <ul>{steps}</ul>
          </div>
        </div>
      </>
    );
  }
}
