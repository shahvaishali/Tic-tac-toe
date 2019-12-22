import React, { Component } from "react";
import Board from "../Board/Board";
import { checkWinner } from "../../lib/checkwinner";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ square: Array(9).fill(null) }],
      playerOne: true,
      stepNum: 0,
      X: 0, 
      O: 0, 
      draw: 0
    };
  }

  changePlayer(i) {
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const currentSquare = history[this.state.stepNum];
    const square = currentSquare.square.slice();
    const winner = checkWinner(square)
    if (this.state.stepNum > 8 || winner.winner){
      // Resets the game with click in events such as tie or winner
      this.gameReset(winner.winner)
    }
    else if (this.state.stepNum <= 8 && !winner.winner && !square[i]) {
      square[i] = this.state.playerOne ? "X" : "O";
      let playerOneWin = this.state.X
      let playerTwoWin = this.state.O
      let tie = this.state.draw
      const winner = checkWinner(square)
      if (this.state.stepNum === 8 || winner.winner){
        if (winner.winner === 'X'){
          playerOneWin += 1
        }
        else if (winner.winner === 'O'){
          playerTwoWin += 1
        }
        else{
          tie += 1
        }
      }
      this.setState({
        playerOne: !this.state.playerOne,
        history: history.concat([{ square: square }]),
        stepNum: this.state.stepNum + 1,  
        draw: tie,
        X: playerOneWin,
        O: playerTwoWin
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

  gameReset(winner) {
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
      const desc = move ? "Go to move #" + move : "Reset";
      return (
        <li key={move}>
          <button  className="btn btn-info mb-1" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let playerOne =  "playerNoTurn"
    let playerTwo =  "playerNoTurn"
    const winner = checkWinner(square);
    let status
    if (winner.winner) {
      status = winner.winner + " Wins";
    } else if (this.state.stepNum > 8) {
      status = "It's a tie!";
    } 
    else{
      playerOne = this.state.playerOne ? "playerTurn" : "playerNoTurn"
      playerTwo = this.state.playerOne ? "playerNoTurn" : "playerTurn"
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
               blinker={winner.line}
            />
            <div className="co-12 mt-4">
            <div className="row">
              <div className="ScoreBtnContainer col-md-4">
                  <h5 className={playerOne}>Player 1 (X)</h5>
              <div className="scoreBtn" id="team1">{this.state.X}</div>
              </div>
              <div className="ScoreBtnContainer col-md-4">
                  <h5 className={playerTwo}>Player 2 (O)</h5>
              <div className="scoreBtn" id="team1">{this.state.O}</div>
              </div>
             
            </div>
            
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
