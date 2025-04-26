import { useState, useEffect, useRef } from "react";
import './Ludo.css';
import { GiPerspectiveDiceOne, GiPerspectiveDiceTwo, GiPerspectiveDiceThree, GiPerspectiveDiceFour, GiPerspectiveDiceFive, GiPerspectiveDiceSix } from "react-icons/gi";




function Ludo() {
const [lock, setLock] = useState(false);
const [player, setPlayer] = useState(1);
const [countPlayer1, setCountPlayer1] = useState(0);
const [totalPlayer1, setTotalPlayer1] = useState(0);
const [countPlayer2, setCountPlayer2] = useState(0);
const [totalPlayer2, setTotalPlayer2] = useState(0);
const [isRoundComplete, setIsRoundComplete] = useState(false);
const [winner, setWinner] = useState(null);
const [gameCompleted, setGameCompleted] = useState(false);
const player1DiceRef = useRef(null);
const player2DiceRef = useRef(null);


const [currentDice, setCurrentDice] = useState(null);




const getNumber = () => {
  return Math.floor(Math.random() * 6) + 1;
};
const getDiceIcon = (number) => {
  switch (number) {
    case 1: return <GiPerspectiveDiceOne />;
    case 2: return <GiPerspectiveDiceTwo />;
    case 3: return <GiPerspectiveDiceThree />;
    case 4: return <GiPerspectiveDiceFour />;
    case 5: return <GiPerspectiveDiceFive />;
    case 6: return <GiPerspectiveDiceSix />;
    default: return <GiPerspectiveDiceOne />;
  };
};




const handlePlayer1Click = () => {
  if (lock) return;
  rollDice(1);
};




const handlePlayer2Click = () => {
  if (lock) return;
  rollDice(2);
};




const rollDice = (playerNum) => {
  setLock(true);
  const diceRef = playerNum === 1 ? player1DiceRef : player2DiceRef;
  setCurrentDice(playerNum);
  if (diceRef.current) {
    diceRef.current.classList.add('animate-dice-roll');
    setTimeout(() => {
      diceRef.current.classList.remove('animate-dice-roll');
      const newNumber = getNumber();
      if (playerNum === 1) {
        setCountPlayer1(newNumber);
        setTotalPlayer1((prevTotal) => prevTotal + newNumber);
        setPlayer(2);
      } else if (playerNum === 2) {
        setCountPlayer2(newNumber);
        setTotalPlayer2((prevTotal) => prevTotal + newNumber);
        setPlayer(1);
      }
      setIsRoundComplete(playerNum === 2);
      setLock(false);
    }, 1000);
  }
};




const resetGame = () => {
  setCountPlayer1(null);
  setCountPlayer2(null);
  setCurrentDice(null);
  setTotalPlayer1(0);
  setTotalPlayer2(0);
  setWinner(null);
  setLock(false);
    setGameCompleted(false);
    document.getElementById('gameBoard').classList.remove('blur');
  document.body.classList.remove('ludo-background');
};




useEffect(() => {
  if (isRoundComplete) {
    if (totalPlayer1 >= 25 && totalPlayer1 > totalPlayer2) {
      setWinner("Player 1 wins!");
      setLock(true);
      setGameCompleted(true);
        document.getElementById('gameBoard').classList.add('blur');

    } else if (totalPlayer2 >= 25 && totalPlayer2 > totalPlayer1) {
      setWinner("Player 2 wins!");
      setLock(true);
      setGameCompleted(true);
        document.getElementById('gameBoard').classList.add('blur');

    }
  }
}, [isRoundComplete, totalPlayer1, totalPlayer2]);




return (
  <div>
  {gameCompleted && (
    <div className="winner-dialog">
      <p style={{ fontSize: '2em', color: 'gold' }}>{winner}</p>
      <button onClick={resetGame} className="reset-button">
        New Game
      </button>
    </div>
    )}
    <div className={`ludo-container ${gameCompleted ? 'game-completed' : ''}`}>
        <div className="ludo-card">
            <h1 className="ludo_title" style={{ textAlign: 'center', color: '#5D3A1E' }}>Ludo</h1>
        </div>


        <div className="current-player">
            <h2>Current Player: {player}</h2>
        </div>
        <div className="players-container">
            <div className="player-card player1">
                <h3>Player 1</h3>
                <div className="player-total-container">
                    <p className="player-total">Total: <span style={{ fontSize: '25px' }}>{totalPlayer1}</span></p>
                </div>
                <div
                    className={`die-icon ${player === 1 && !lock ? 'active' : ''}`}
                    ref={player1DiceRef}
                    onClick={player === 1 && !lock ? handlePlayer1Click : undefined}
                >
                    {getDiceIcon(countPlayer1)}
                </div>
            </div>
            <div className="player-card player2">
                <h3>Player 2</h3>
                <div className="player-total-container">
                    <p className="player-total">Total: <span style={{ fontSize: '25px' }}>{totalPlayer2}</span></p>
                </div>
                <div
                    className={`die-icon ${player === 2 && !lock ? 'active' : ''}`}
                    ref={player2DiceRef}
                    onClick={player === 2 && !lock ? handlePlayer2Click : undefined}
                >
                    {getDiceIcon(countPlayer2)}
                </div>
            </div>
        </div>
        <div className="ludo-background" id="gameBoard">

        </div>
    </div>
    </div>
);


};




export default Ludo;