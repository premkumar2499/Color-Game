import { useEffect, useState } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import './PlayerWindow.scss';

const PlayerWindow = ({player,duration,show,nowPlaying,setNowPlaying,playerScore,setPlayerScore}) =>{
    const [question, setQuestion] = useState();
    const [colors,setColors] = useState([]);
    const [msg,setMsg] = useState(null);
    const [count,setCount] = useState(0);
    

    useEffect( () => {
        const getColor = () => {
            let index = Math.floor(Math.random() * 6);
            let color = [];
            for(var i=0;i<6;i++){
                let rgb = [];
                for (var j = 0; j < 3; j++) {
                    let r = Math.floor(Math.random() * 256)
                    rgb.push(r)
                }
                if(i === index){
                    setQuestion(rgb);
                    color.push(<ColorBox key={i} id={i} rgb={rgb} correct={true} setMsg={setMsg} setNowPlaying={setNowPlaying} nowPlaying={nowPlaying} setPlayerScore={setPlayerScore} playerScore={playerScore} setCount={setCount} count={count}/>)
                }
                else{
                    color.push(<ColorBox key={i} id={i} rgb={rgb} correct={false} setMsg={setMsg} setNowPlaying={setNowPlaying} nowPlaying={nowPlaying} setPlayerScore={setPlayerScore} playerScore={playerScore} setCount={setCount} count={count}/>)
                }
            }
            setColors(color)
        }
        getColor();
        
    },[setNowPlaying,setPlayerScore,nowPlaying])
    useEffect(()=>{
        if(count > 4){
            setNowPlaying(
                nowPlaying => (nowPlaying === 1 ) ? 2 : 1
            )
            setCount(0);
            setMsg(null);
        }
    },[count,setCount,nowPlaying,setNowPlaying,setMsg])

    return(
        ( show ) ? (
            <div className="player">
                <div className="question-box">
                    <div className="score">
                        <p>Score</p>
                        <p>{playerScore}</p>
                    </div>
                    <div className="question">
                        <p>Guess the color using the RGB value</p>
                        {(question && question.length) ? (
                            <p>{`( ${question[0]}, ${question[1]}, ${question[2]} )`}</p>
                        ) : (
                            <p>it is not there</p>
                        )}  
                        {msg && <p>{msg}</p>}
                    </div>
                    <div className="user-details">
                        <p>{player}</p>
                        <p>{duration} sec</p>
                    </div>
                </div>
                <div className="color-palatte">
                    {colors}
                </div>
            </div>
        ) : (
            <div className="player-offline">
                <div className="offline-name">
                    <h3>Hi {player}! 👋</h3>
                    <h3>Please Wait for you turn</h3>
                </div>
                <div className="offline-box">
                    <h3>Your score : {playerScore}</h3>
                    <h3>⏲️ Remaining : {duration} sec</h3>
                </div>
            </div>
        )
    
    )
}

export default PlayerWindow;