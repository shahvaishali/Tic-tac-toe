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
    square[i] = this.state.playerOne ? "X" : "O";
    this.setState({
      square: square,
      playerOne: !this.state.playerOne
    });
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
    return (
      <>
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
