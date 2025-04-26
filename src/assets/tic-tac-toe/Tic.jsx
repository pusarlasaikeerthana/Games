import { useState } from 'react'
import './Tic.css'

function Tic() {
  const [winningLine, setWinningLine] = useState(null);

  let  patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let [count, setCount] = useState(0)
  let [lock, setLock] = useState(false)
  let [winner,setWinner] = useState("")
  let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);


  const toggle=(e,num)=>{

    if(lock){
      return 0;
    }
    if(count%2 == 0){
      e.target.innerText = "X"
      data[num] = "X"
    }
    else{
      e.target.innerText = "O"
      data[num] = "O"
    }
    setCount(++count)
    setData([...data])
    console.log(data)
    checkWinner(data)
  }
  
  const checkWinner=(data)=>{
    for (let i = 0; i < patterns.length; i++) {
      let [a, b, c] = patterns[i];

      if(data[a]==data[b] && data[b]==data[c] && data[a] != ""){
        setWinningLine(patterns[i]);
        getWon()
        setWinner(data[a])
        setLock(true)
        return;
      }
    }

    if(count === 9) {
      setWinner("draw");
    }
  }

  const getWon = () => {
    // This function currently does nothing, but can be expanded later if needed
  }

  const drawLine = () => {
    if (!winningLine) return null;

    const [a, b, c] = winningLine;
    const boxes = document.querySelectorAll('.boxes');

    const getBoxCenter = (index) => {
      const boxRect = boxes[index].getBoundingClientRect();
      return {
        x: boxRect.left + boxRect.width / 2,
        y: boxRect.top + boxRect.height / 2,
      }
    };

    const start = getBoxCenter(a);
    const end = getBoxCenter(c);
    
    return (
      <g>
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="red"
          strokeWidth="5"
        />
      </g>
    );
  };
  
  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setLock(false);
    setCount(0);
    setWinner(null);
    setWinningLine(null);
  }

  const DisplayWinner = () => {
    let resultText;
    if (winner === "draw") {
      resultText = "Result is Draw";
    } else {
      resultText = (
        <>
          Winner is <span style={{ color: winner === "X" ? "#3594cf" : "#d56262", fontWeight: "bold" }}>{winner}</span>
        </>
      );
    }

    return (
      <div className='result-dialog'>
        <p style={{ color: "black" }}>
          {resultText}
        </p>
        <button className='resetButton' onClick={resetGame}>New Game</button>
      </div>
    )
  }

  return (
    <>
      <div className='container'>
        {winner && (
          <DisplayWinner />
        )}
        <h1 className='title'>Tic-Tac-Toe</h1>

        <div className={`board ${lock ? 'blurred-background' : ''}`}>           
          <div className='row1'>         
            {[0, 1, 2].map((num) => (<div key={num} className='boxes' onClick={(e) => toggle(e, num)}>              
            {data[num] === "X" ? <span className='x-color'>X</span> : data[num] === "O" ? <span className='o-color'>O</span> : ""}       
            </div>))}
          </div>
          <div className='row1'>
            {[3, 4, 5].map((num) => (<div key={num} className='boxes' onClick={(e) => toggle(e, num)}>
              {data[num] === "X" ? <span className='x-color'>X</span> : data[num] === "O" ? <span className='o-color'>O</span> : ""}
            </div>))}
          </div>
          <div className='row1'>
            {[6, 7, 8].map((num) => ( <div key={num} className='boxes' onClick={(e) => toggle(e, num)}>
            {data[num] === "X" ? <span className='x-color'>X</span> : data[num] === "O" ? <span className='o-color'>O</span> : ""}
            </div>))}
          </div>
        </div>

        <button className='resetButton' onClick={resetGame}>Reset Game</button>
      </div>
    </>
  )
}
export default Tic;
