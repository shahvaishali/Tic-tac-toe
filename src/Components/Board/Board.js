import React, { Component } from "react";
import Square from "../Square/Square";

export default class Board extends Component {
  renderSquare(i, style) {
    let blink_style = ""
    if (this.props.blinker.includes(i)){
      blink_style = 'blink_me'
    }
    return (
      <Square
        value={this.props.square[i]}
        onClick={() => this.props.onClick(i)}
        style={style}
        blink_style={blink_style}
      />
    );
  }

  render() {
    return (
      <>
        <div className="board-row">
        {this.renderSquare(0, this.props.style + ' square bottom right')}
          {this.renderSquare(1, this.props.style + ' square bottom')}
          {this.renderSquare(2, this.props.style + ' square bottom left')}
        </div>
        <div className="board-row">
          {this.renderSquare(3, this.props.style + ' square right')}
          {this.renderSquare(4, this.props.style + ' square')}
          {this.renderSquare(5, this.props.style + ' square left')}
        </div>
        <div className="board-row">
          {this.renderSquare(6, this.props.style + ' square top right')}
          {this.renderSquare(7, this.props.style + ' square top')}
          {this.renderSquare(8, this.props.style + ' square top left')}
        </div>
      </>
    );
  }
}
