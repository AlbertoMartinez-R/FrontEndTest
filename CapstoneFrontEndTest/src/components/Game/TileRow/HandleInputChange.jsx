import React from "react";

export function CompareGuessToWOTD(WOTD, inputs, guessStatus, currentRow){
    //const WOTDArray = WOTD.wotd.toUpperCase().split("");
    const WOTDArray = WOTD.wotd.toUpperCase().split("");
    const newGuessStatus = [...guessStatus]
    let winningGuess = true;
    for(let i = 0; i < inputs.length; i++){
        if(WOTDArray[i]==inputs[i]){
            newGuessStatus[currentRow][i]="correct";
        }else if(WOTDArray.includes(inputs[i])){
            winningGuess=false;
            newGuessStatus[currentRow][i]="partial";
        }else{
            winningGuess=false;
            newGuessStatus[currentRow][i]="incorrect";
        }
    }
    return{newGuessStatus, winningGuess};
}