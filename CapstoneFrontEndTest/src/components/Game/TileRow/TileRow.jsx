import React, {useCallback, useEffect, useRef, useState} from "react";
import {CompareGuessToWOTD} from "./HandleInputChange";
import getStatusColor from "./StatusColor";
import {Paper, Box} from "@mui/material";

export default function TileRow({
                                    onRowComplete,
                                    rowIndex,
                                    active,
                                    status,
                                    guessStatus,
                                    setGuessStatus,
                                    guessIndex,
                                    setGuessIndex,
                                    activeRow,
                                    gameOver,
                                    setGameOver,
                                    fullGuess,
                                    setFullGuess,
                                    WOTD,
                                    setCorrectGuess,
                                    currentDate,
                                    handleStart,
                                    startTimer
                                }) {
    const [inputs, setInputs] = useState(['', '', '', '', '']);
    const [disabled, setDisabled] = useState([false, true, true, true, true]);
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, inputs.length).map((_, i) => inputRefs.current[i] || React.createRef());
    }, [inputs.length]);

    const handleInputChange = (e, index) => {
        const value = e.target.value.toUpperCase();
        if (value.length <= 1) {
            const newInputs = [...inputs];
            newInputs[index] = value;
            setInputs(newInputs);

            if (value && index < inputs.length - 1) {
                const newDisabled = [...disabled];
                newDisabled[index + 1] = false;
                newDisabled[index] = true;
                setDisabled(newDisabled);
                setTimeout(() => {
                    inputRefs.current[index + 1].current.focus();
                }, 0);
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !inputs[index] && index > 0) {
            const newInputs = [...inputs];
            newInputs[index - 1] = '';
            setInputs(newInputs);

            const newDisabled = [...disabled];
            newDisabled[index - 1] = false;
            newDisabled[index] = true;
            setDisabled(newDisabled);

            setTimeout(() => {
                inputRefs.current[index - 1].current.focus();
            }, 0);
        }

        if (e.key === 'Enter' && index === inputs.length - 1 && inputs[4] !== "") {
            const newDisabled = [...disabled];
            newDisabled[index] = true;
            setDisabled(newDisabled);
            onRowComplete(rowIndex);
            const status = CompareGuessToWOTD(WOTD, inputs, guessStatus, activeRow);
            setGuessStatus(status.newGuessStatus);

            const guess = [...inputs];
            const newFullGuess = [...fullGuess];
            newFullGuess[activeRow] = guess;
            setFullGuess(newFullGuess);

            if (status.winningGuess) {
                setGameOver(true);
                setCorrectGuess(true);
                let correctGuessIndex = (guessIndex + 1);
                return correctGuessIndex;
            }
        } else if (e.key === 'Enter' && (index !== inputs.length - 1 || inputs[4] === "")) {
            alert('Please fill the entire row before pressing enter');
        }

        if (e.key === 'Escape' && index) {
            e.preventDefault();
            e.target.blur();
        }
    };

    const setRef = useCallback((element, index) => {
        inputRefs.current[index] = { current: element };
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            {/*<Paper sx={{ p: 1, display: 'flex', gap: '4px' }}>*/}
                {inputs.map((input, index) => {
                    const cellDisabled = disabled[index] || !active || gameOver;
                    const status = guessStatus[rowIndex][index];
                    return (
                        <Paper
                            key={index}
                            className="singleTile"
                            sx={{
                                backgroundColor: getStatusColor(status),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '50px',
                                height: '50px',
                                margin: '2px',
                            }}
                        >
                            <input
                                type="text"
                                ref={(element) => setRef(element, index)}
                                className="letterBox"
                                value={input}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                disabled={cellDisabled}
                                maxLength={1}
                                style={{
                                    textAlign: 'center',
                                    width: '100%',
                                    height: '100%',
                                    padding: '0',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    color: cellDisabled ? 'black' : 'black',
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                }}
                            />
                        </Paper>
                    );
                })}
            {/*</Paper>*/}
        </Box>
    );
}
