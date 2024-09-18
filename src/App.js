import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Player ${winner === 'X' ? 1 : 2} WON!`
    : board.every(Boolean)
    ? 'Tie!'
    : `Next Player: ${isXNext ? 'Player 1 (X)' : 'Player 2 (O)'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <h1 className="title">TIC-TAC-TOE</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((value, index) => (
          <button className="square" key={index} onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>RESET</button>
    </div>
  );
}

export default App;
