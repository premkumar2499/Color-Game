import './App.css';
import PlayerWindow from './components/PlayerWindow/PlayerWindow'
import StartPage from './components/StartPage/StartPage';
import {Howl} from 'howler';
import BGM from './sounds/bgm.mp3'
import React , {useEffect, useState} from 'react';

const sound = new Howl({
  src: [BGM],
  loop: true,
  volume: 0.4,
});

function App() {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const [playerOneDuration, setPlayerOneDuration] = useState(60);
  const [playerTwoDuration, setPlayerTwoDuration] = useState(60);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  

  useEffect(() => {
    if(playerOneDuration === 0 || playerTwoDuration === 0){
      setGameOver(true);
      if(playerOneScore > playerTwoScore){
        setWinner(player1);
      }
      else{
        if(playerOneScore === playerTwoScore){
          playerOneDuration > playerTwoDuration ? setWinner(player1) : setWinner(player2);
        }
        else{
          setWinner(player2);
        }
      }
    }
    else{
      if(isPlaying){
          setTimeout(() => {
            if(nowPlaying === 1){
              setPlayerOneDuration(playerOneDuration => playerOneDuration - 1);
            }
            else{
              setPlayerTwoDuration(playerTwoDuration => playerTwoDuration - 1);
            }
          }, 1000);
      }
    }
  },[playerOneDuration,playerTwoDuration,isPlaying,player1,player2,setGameOver]);


  useEffect(() => {
    console.log(isPlaying);
    if(isPlaying){
      sound.play();
      console.log("it is true");
    }
    else{
      sound.stop();
      console.log("it is false");
    }
    if(!(winner === null || winner === undefined)){
      sound.stop();
    }
  },[isPlaying,winner])

  const startPlaying = (value) =>{
    setIsPlaying(value);
    setNowPlaying(1);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setPlayerOneDuration(60);
    setPlayerTwoDuration(60);
  }

  // const calculateTimeLeft = (time) =>{
  //   return --time;
  // }

  const clearData = () =>{
    setGameOver(false);
    setPlayer1(null);
    setPlayer2(null);
    startPlaying(false);
    setWinner(null);
}

  return(
    <div className="container">
      { isPlaying ? (
          gameOver ? (
            <>
              <StartPage clearData={clearData} winner={winner}/>
            </>
          ) : (
          <>
            <PlayerWindow player={player1} duration={playerOneDuration} show={nowPlaying === 1} setNowPlaying={setNowPlaying} nowPlaying={nowPlaying} playerScore={playerOneScore} setPlayerScore={setPlayerOneScore}/>
            <PlayerWindow player={player2} duration={playerTwoDuration} show={nowPlaying === 2} setNowPlaying={setNowPlaying} nowPlaying={nowPlaying} playerScore={playerTwoScore} setPlayerScore={setPlayerTwoScore}/>
          </>
          )
      ) : (
          <StartPage player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2} startPlaying={startPlaying}/>
      )}
    </div>
  )
}

export default App;
