import React, { Component } from "react";

export default class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      val: "X"
    });
  }

  render() {
    return (
      <div className="square" onClick={this.handleClick}>
        {this.state.val}
      </div>
    );
  }
}
