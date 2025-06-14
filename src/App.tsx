import React, { useState } from 'react';
import './styles.css';
import logo_0 from './assets/logo_0.png';
import RPLogo2_1 from './assets/RPLogo2_1.png';

export default function App() {
  const randomNumber = () => Math.floor(Math.random() * 100) + 1;
  const [target, setTarget] = useState<number>(randomNumber());
  const [guess, setGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [guesses, setGuesses] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setFeedback('Please enter a number between 1 and 100');
      return;
    }
    const newGuesses = [...guesses, num];
    setGuesses(newGuesses);

    let result = '';
    if (num === target) {
      result = `Correct! You guessed it in ${newGuesses.length} tries.`;
      setIsGameOver(true);
    } else if (num < target) {
      result = 'Too low!';
    } else {
      result = 'Too high!';
    }
    setFeedback(result);
    setGuess('');

    if (typeof (window as any).sendDataToGameLab === 'function') {
      (window as any).sendDataToGameLab({ event: 'guess', guess: num, result, guessesCount: newGuesses.length });
    }

    if (num === target) {
      if (typeof (window as any).sendDataToGameLab === 'function') {
        (window as any).sendDataToGameLab({ event: 'gameOver', target, totalGuesses: newGuesses.length });
      }
    }
  };

  const handlePlayAgain = () => {
    const newTarget = randomNumber();
    setTarget(newTarget);
    setGuesses([]);
    setFeedback('');
    setIsGameOver(false);
    setGuess('');
  };

  return (
    <div className="App">
      <header className="header">
        <img src={logo_0} alt="logo.png" className="logo" />
        <img src={RPLogo2_1} alt="RPLogo2.png" className="logo" />
      </header>
      <h1>Number Guessing Game</h1>
      {!isGameOver && (
        <div className="game-container">
          <p>I'm thinking of a number between 1 and 100.</p>
          <input
            type="number"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            placeholder="Your guess"
          />
          <button onClick={handleGuess}>Guess</button>
        </div>
      )}
      {feedback && <p className="feedback">{feedback}</p>}
      {isGameOver && (
        <button onClick={handlePlayAgain} className="play-again">
          Play Again
        </button>
      )}
      {guesses.length > 0 && (
        <div className="guesses">
          <p>Guesses: {guesses.join(', ')}</p>
        </div>
      )}
    </div>
  );
}