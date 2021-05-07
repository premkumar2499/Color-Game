import React from 'react';
import {Howl} from 'howler';
import Coin from '../../sounds/mario_coin_sound.mp3'
import WrongAnswerSound from '../../sounds/wrong.mp3'
import './ColorBox.scss'

const ColorBox = ({id,rgb,correct,setMsg,nowPlaying,setNowPlaying,setPlayerScore,playerScore,setCount,count}) => {

    const sound1 = new Howl({
        src: [Coin]
      });

    const sound2 = new Howl({
        src: [WrongAnswerSound]
    });
    
    const checkAnswer = (e) => {
        if(correct === true){
            setMsg(null);
            setNowPlaying(
                nowPlaying => (nowPlaying === 1 ) ? 2 : 1
            )
            setPlayerScore(
                playerScore => playerScore+1
            )
            console.log(nowPlaying);
            sound1.rate(1.5, sound1.play());
            setCount(0);
        }
        else{
            setMsg('Wrong answer, Try again');
            sound2.rate(2, sound2.play());
            e.target.style.display = 'none';
            setCount(
                count => count+1
            )
        }
    }
    var styles = {
        backgroundColor: `rgb(${rgb})`,
      };
    return(
        <>
            <div className="color-box" id={id} style={styles} onClick={(e) => checkAnswer(e)}>
                {/* <audio className="audio-element" type="audio/mp3">
                    <source src={Coin} type="audio/mp3"/>
                </audio> */}
            </div>
      </>
    )
}

export default ColorBox;