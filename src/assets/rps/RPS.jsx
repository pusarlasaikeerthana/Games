import { useState } from "react";
import './RPS.css'
import { Link } from "react-router-dom";
// import { Search, Person, Chat, Notifications } from "@mui/icons-material";



function RPS(){

    

    const [element,setElement] = useState("")
    const [computerChoice, setComputerChoice] = useState("")
    const [winner, setWinner] = useState("")
    const [lock,setLock] = useState(false)
    const [won, setWon] = useState(0)
    const [lost, setLost] = useState(0)
    const [draw, setDraw] = useState(0)

    const Selectedelement = (value) =>{
        setElement(value)
        var computerChoice = generateComputerChoice()
        checkWinner(value,computerChoice)

        
        // console.log(element)
    }
    
    const generateComputerChoice = () => {
        const choices = ["✊","✋","✌️"]
        const randomNumber = Math.floor(Math.random() * 3)
        setComputerChoice(choices[randomNumber])
        return choices[randomNumber]
    }

    const checkWinner = (value,computerChoice) => {
    if (value === computerChoice) {
      setWinner("Draw");
      setDraw(draw + 1);
      setLock(true);
    } else {
      if (value === "✊" && computerChoice === "✌️") {
        setWinner("You won");
        setWon(won + 1);
        setLock(true);
      } else if (value === "✋" && computerChoice === "✊") {
        setWinner("You won");
        setWon(won + 1);
        setLock(true);
      } else if (value === "✌️" && computerChoice === "✋") {
        setWinner("You won");
        setWon(won + 1);
        setLock(true);
      } else {
        setWinner("You lost");
        setLost(lost + 1);
        setLock(true);
      }
    }
    }

    const DisplayWinner = () =>{
        if (winner === "You won"){
            return <p className='Winner' style={{ color: "#A2577B" }}>🎉🎊🥳</p>; // Display celebratory emojis
        }
        else if (winner === "You lost") {
            return <p className='Winner' style={{ color: "#A2577B" }}>😥😭</p>; // Display sad emojis for loss
        }else {
            return <p className='Winner' style={{ color: "#A2577B" }}>🤝</p>;
        }
    }

    const DisplayScore = () => {
        return (
          <div className="counters">
            <p>Won: <span style={{color: "green", fontSize: "30px"}}>{won}</span> | Lost: <span style={{color: "red", fontSize: "30px"}}>{lost}</span> | Draw: <span style={{color: "rgb(97, 63, 235)", fontSize: "30px"}}>{draw}</span></p>            
          </div>
        );
    }
    const DisplayChoice = () => {
      let playerSymbolStyle = {};
      let computerSymbolStyle = {};
  
      if (element === "✊") playerSymbolStyle = { color: "blue", fontWeight: "bold", fontSize: "70px" };
      else if (element === "✋") playerSymbolStyle = { color: "green", fontWeight: "bold", fontSize: "70px" };
      else if (element === "✌️") playerSymbolStyle = { color: "red", fontWeight: "bold", fontSize: "70px" };
  
      if (computerChoice === "✊") computerSymbolStyle = { color: "blue", fontWeight: "bold", fontSize: "70px" };
      else if (computerChoice === "✋") computerSymbolStyle = { color: "green", fontWeight: "bold", fontSize: "70px" };
      else if (computerChoice === "✌️") computerSymbolStyle = { color: "red", fontWeight: "bold", fontSize: "70px" };
  
      return <p className="choice"> Player: <span style={{...playerSymbolStyle, color: "rgb(97, 63, 235)"}}>{element}</span> VS Computer: <span style={{...computerSymbolStyle, color: "rgb(97, 63, 235)"}}>{computerChoice}</span></p>;
    }
    
    return(
        <>
        <div className="rpscard">
            <h1 className="rps_title">Rock Paper Scissor</h1>
            {lock && DisplayChoice()}
            {lock && DisplayWinner()}
            <div className="elements">
                <div className= "boxs" onClick={()=>Selectedelement("✊")}>
                    
                    <p className="symbols" >✊</p>
                </div>
                <div className= "boxs" onClick={()=>Selectedelement("✋")}>
                    
                    <p className="symbols" >✋</p>
                </div>
                <div className= "boxs" onClick={()=>Selectedelement("✌️")}>
                    
                    <p className="symbols">✌️</p>
                </div>
            </div>
            {lock && DisplayScore()}

        </div>

        </>
    )

}

export default RPS;