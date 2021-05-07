import { useEffect, useState } from "react";
import {Howl} from 'howler';
import WinSound from '../../sounds/smb_stage_clear.wav'
import './StartPage.scss'

const StartPage = ({player1, player2, setPlayer1, setPlayer2, startPlaying,winner,clearData}) => {

    const [btnState, setBtnState] = useState(false);
    useEffect(()=>{
        if(player1 === null || player2 === null){
            setBtnState(false);
        }
        else{
            setBtnState(true);
        }
        if(!(winner === null || winner === undefined)){
            var sound = new Howl({
                src: [WinSound]
              });
            sound.play();
        }
    },[player1,player2,winner])
    const submit =  (e) =>{
        e.preventDefault();
        startPlaying(true);
    }
    // const stopSound = () =>{
    //     sound.stop();
    // }
    return(
        
        <div className="start-container">
            { (winner === null || winner === undefined)  && 
            
                <div className="note">
                    <center><h3>Note</h3></center>
                    <ol>
                        <li><strong>Player 1</strong> will play first</li>
                        <li>Each player is given with 60 secs</li>
                        <li>You will be given with a (RGB) value and 6 color boxes, choose a color which corresponds to that value.</li>
                    </ol>
                </div>
            }
            { winner === null || winner === undefined ? (
                
                <form className="box" onSubmit={submit}> 
                <div className="player-1">
                    <input type="text" 
                            onChange={(e) => (e.target.value.length === 0) ? setPlayer1(null) : setPlayer1(e.target.value)}
                            placeholder="Enter Player 1 Name"
                    />
                </div>
                <div className="player-2">
                    <input 
                        type="text" 
                        onChange={(e) => (e.target.value.length === 0) ? setPlayer2(null) : setPlayer2(e.target.value)}
                        placeholder="Enter Player 2 Name"
                    />
                </div>
                <div className="play">
                    {( btnState ) ? (
                        <button type="submit" className="active" onClick={() => startPlaying}>Let's Play</button>
                    ) : (
                        <button type="submit" className="disable" disabled>Let's Play</button>
                    )}      
                </div>
            </form>
            ) : (
                <div className="final-box">
                    <div className="title">
                        Winner
                    </div>
                    <div className="winner">
                        {winner}
                    </div>
                    <button onClick={clearData}>Play Again</button>
                </div>
            )}
        </div>
    )
}

export default StartPage;