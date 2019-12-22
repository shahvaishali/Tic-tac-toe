import React, { Component } from "react";
import Square from "../Square/Square";

export default class Board extends Component {
  renderSquare(i, style) {
    return (
      <Square
        value={this.props.square[i]}
        onClick={() => this.props.onClick(i)}
        style={style}
      />
    );
  }

  render() {
    return (
      <>
        <div className="board-row">
        {this.renderSquare(0, 'square bottom right')}
          {this.renderSquare(1, 'square bottom')}
          {this.renderSquare(2, 'square bottom left')}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 'square right')}
          {this.renderSquare(4, 'square')}
          {this.renderSquare(5, 'square left')}
        </div>
        <div className="board-row">
          {this.renderSquare(6, 'square top right')}
          {this.renderSquare(7, 'square top')}
          {this.renderSquare(8, 'square top left')}
        </div>
      </>
    );
  }
}
