import React, { useEffect, useState } from "react";
import getStatusColor from "../TileRow/StatusColor";

export default function VirtualKeyboard({guessStatus, activeRow, fullGuess}){
    const [qwertyTop, setQwertyTop] = useState({"q":"", "w":"", "e":"", "r":"", "t":"", "y":"", "u":"", "i":"", "o":"", "p":""})
    const [qwertyMid, setQwertyMid] = useState({"a":"", "s":"", "d":"", "f":"", "g":"", "h":"", "j":"", "k":"", "l":""})
    const [qwertyBot, setQwertyBot] = useState({"z":"", "x":"", "c":"", "v":"", "b":"", "n":"", "m":""})
    
    useEffect(()=>{
        const newQwertyTop = {...qwertyTop}
        const newQwertyMid = {...qwertyMid}
        const newQwertyBot = {...qwertyBot}
        fullGuess.map((guess, index)=>{
            guess.forEach((character, jndex)=>{
                const lowChar = character.toLowerCase();
                if (Object.keys(qwertyTop).includes(lowChar)){
                    //guessStatusColor sets the empty sting in qwertyTop to the the value of the index (activeRow) and jndex (each letter of the guess)
                    newQwertyTop[lowChar] = getStatusColor(guessStatus[index][jndex])
                }
                if (Object.keys(qwertyMid).includes(lowChar)){
                    newQwertyMid[lowChar] = getStatusColor(guessStatus[index][jndex])
                }
                if (Object.keys(qwertyBot).includes(lowChar)){
                    newQwertyBot[lowChar] = getStatusColor(guessStatus[index][jndex])
                }
            })
        })
        setQwertyTop(newQwertyTop)
        setQwertyMid(newQwertyMid)
        setQwertyBot(newQwertyBot)
    },[activeRow])

    return(
        <>
            <div className="virtualKeyboard">
                <div className="keyboardRow">
                    {Object.keys(qwertyTop).map((letter)=>{
                        const status = qwertyTop[letter]
                        // console.log(letter)
                        return(
                            <div className="key" key={letter} style={{backgroundColor:status}}>
                                {letter.toUpperCase()}
                            </div>
                        )
                    })
                    }
                </div>
                <div className="keyboardRow">
                    {Object.keys(qwertyMid).map((letter)=>{
                        const status = qwertyMid[letter]
                        return(
                            <div className="key" key={letter} style={{backgroundColor:status}}>
                                {letter.toUpperCase()}
                            </div>
                        )
                    })
                    }
                </div>
                <div className="keyboardRow">
                        {Object.keys(qwertyBot).map((letter)=>{
                            const status = qwertyBot[letter]
                            return(
                                <div className="key" key={letter} style={{backgroundColor:status}}>
                                    {letter.toUpperCase()}
                                </div>
                            )
                        })
                        }
                </div>
            </div>
        </>
    )
}