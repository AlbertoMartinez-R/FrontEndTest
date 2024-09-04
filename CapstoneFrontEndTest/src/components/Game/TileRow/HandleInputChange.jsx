export function CompareGuessToWOTD(WOTD, inputs, guessStatus, currentRow) {
    //const WOTDArray = WOTD.wotd.toUpperCase().split("");
    const WOTDArray = WOTD.wotd.toUpperCase().split("");
    const newGuessStatus = [...guessStatus]
    let winningGuess = true;
    const letterCount = {};
    // for(let i = 0; i < inputs.length; i++){
    //     if(WOTDArray[i]==inputs[i]){
    //         newGuessStatus[currentRow][i]="correct";
    //     }else if(WOTDArray.includes(inputs[i])){
    //         winningGuess=false;
    //         newGuessStatus[currentRow][i]="partial";
    //     }else{
    //         winningGuess=false;
    //         newGuessStatus[currentRow][i]="incorrect";
    //     }
    // }
    for(let i = 0; i < inputs.length; i++){
        if(WOTDArray[i]==inputs[i]){
            newGuessStatus[currentRow][i]="correct"
            letterCount[WOTDArray[i]] = (letterCount[WOTDArray[i]] || 0) + 1
        }else{
            winningGuess = false;
            newGuessStatus[currentRow][i] = ""
        }
    }

    for(let i = 0; i < inputs.length; i++){
        if(newGuessStatus[currentRow][i] !== "correct"){
            if (WOTDArray.includes(inputs[i]) && (letterCount[inputs[i]] || 0) < WOTDArray.filter(x => x === inputs[i]).length) {
                newGuessStatus[currentRow][i] = "partial";
                letterCount[inputs[i]] = (letterCount[inputs[i]] || 0) + 1;
            } else {
                newGuessStatus[currentRow][i] = "incorrect";
            }
        }
    }

    return {newGuessStatus, winningGuess};
}