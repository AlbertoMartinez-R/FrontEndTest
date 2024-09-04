import React, {useEffect, useState} from "react";
import TileRow from './TileRow/TileRow';
import VirtualKeyboard from "./VirtualKeyboard/VirtualKeyboard.jsx";
import getCurrentDayOfYearEST from "./DateHandler";
import StopWatch from "./Stopwatch/Stopwatch";
import {Box, Button, Paper} from "@mui/material";

export default function StandardGameBoard({
                                              guessStatus,
                                              setGuessStatus,
                                              guessIndex,
                                              setGuessIndex,
                                              fullGuess,
                                              setFullGuess,
                                              WOTD,
                                              handleStart,
                                              setStartTimer,
                                              startTimer,
                                              pauseTimer,
                                              setPauseTimer,
                                              time,
                                              setTime
                                          }) {
    const [activeRow, setActiveRow] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [correctGuess, setCorrectGuess] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false)

    const currentDate = getCurrentDayOfYearEST();
// console.log(`Today's date of ${currentDate} / 365`)

    const userData = JSON.parse(localStorage.getItem("userData"));
    const username = userData.username;
    const token = sessionStorage.getItem('usertoken')

    const handleRowComplete = (rowIndex) => {
        //This correctly sets game over to True if you fail to get the correct guess after 5 guesses
        if (rowIndex === 5 && !correctGuess) {
            setGameOver(true)
        }
        if (rowIndex < 5) {
            setActiveRow(rowIndex + 1)
        }
    }
    let word = WOTD;

// NEEEEED TO DO THIS PART AND FINISH THIS FUNCTION
    async function getLastPlayed() {
        try {
            const response = await fetch('http://localhost:3032/api/game/*****')
            const result = await response.json();
            console.log(result.last_played);
            //need to use result.last_played
            // const last_played = result.last_played but I will need to see what the
            // return last_played
        } catch (e) {
            console.error('Failure to get last time played', e);
        }
    }

//need to add last_played POST AND GET REQUEST
//Backend stat database needs "username", "correctGuess" which is T/F, "attempts" = # of guesses it took, "word" = WOTD
    async function updateStats(username, correctGuess, attempts, word, currentDate) {
        try {
            const response = await fetch(`http://localhost:3032/api/game/data/${username}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({username: username, last_played: currentDate})
            });
            const info = await response.json();
            console.log(info);
        } catch (error) {
            console.error('Failure to update last played date', error);
        }
        try {
            const response = await fetch('http://localhost:3032/api/game/regular', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({username: username, correctGuess: correctGuess, attempts: attempts, word: word})
            });
            const info = await response.json();
            console.log(info);
        } catch (e) {
            console.error('Failure to update stats', e)
        }
    }

//useEffect that runs UpdateStats when gameOver or activeRow changes
    useEffect(() => {
        if (gameOver) {
            updateStats(username, correctGuess, activeRow, word)
            setPauseTimer(true);
        }
    }, [activeRow, gameOver])

    const startGame = () => {
        setIsPlaying(true);
        setStartTimer(true);
        setPauseTimer(false);
    }

    useEffect(() => {
        if (gameOver) console.log("Final time:", time)
    }, [gameOver])
    return (
        <Paper
        sx={{
            padding: '25px'
        }}
        >
            <div className="game-container">
                {!isPlaying && (
                    <div className="overlay">
                        <Button className="play-button" onClick={startGame}>
                            Play Game & Start Timer!
                        </Button>
                    </div>
                )}
                <Box className="timer-container">
                    <StopWatch
                        setStartTimer={setStartTimer}
                        startTimer={startTimer}
                        setPauseTimer={setPauseTimer}
                        pauseTimer={pauseTimer}
                        time={time}
                        setTime={setTime}
                    />
                </Box>
                <div className={`game-board ${isPlaying ? '' : 'disabled'}`}>
                    {guessStatus.map((_, index) => (
                        <TileRow
                            key={index}
                            rowIndex={index}
                            active={index === activeRow}
                            activeRow={activeRow}
                            onRowComplete={handleRowComplete}
                            guessStatus={guessStatus}
                            setGuessStatus={setGuessStatus}
                            guessIndex={guessIndex}
                            setGuessIndex={setGuessIndex}
                            fullGuess={fullGuess}
                            setFullGuess={setFullGuess}
                            gameOver={gameOver}
                            setGameOver={setGameOver}
                            WOTD={WOTD}
                            setCorrectGuess={setCorrectGuess}
                            currentDate={currentDate}
                            handleStart={handleStart}
                        />))}
                    <VirtualKeyboard
                        guessStatus={guessStatus}
                        activeRow={activeRow}
                        fullGuess={fullGuess}
                    />
                </div>
            </div>
        </Paper>
    );
}
