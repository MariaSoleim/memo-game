import React from 'react';
import Board from './board'

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="gameBoard">
          <Board/>
        </div>
      </div>
    )
  }
}