import StandardGameBoard from "../components/Game/StandardGameBoard.jsx";
import {useEffect, useState} from "react";
import getWOTD from '../components/Game/TileRow/getWOTD.js'

const GamesPage = () => {
    const [guessStatus, setGuessStatus] = useState([['', '', '', '', '',], ['', '', '', '', '',], ['', '', '', '', '',], ['', '', '', '', '',], ['', '', '', '', '',], ['', '', '', '', '',]])
    const [guessIndex, setGuessIndex] = useState(0);
    const [fullGuess, setFullGuess] = useState([[], [], [], [], [], []])
    const [startTimer, setStartTimer] = useState(false);
    const [pauseTimer, setPauseTimer] = useState(true);
    const [time, setTime] = useState(0);

    const [WOTD, setWOTD] = useState('APPLE')

    //get from api
    // if(todaysDate === API)
    const getNewWOTD = async () => {
        const newWOTD = await getWOTD();
        setWOTD(newWOTD);
        return WOTD
    }
    useEffect(() => {
        getNewWOTD();
    }, [])

    return (
        <StandardGameBoard
            guessStatus={guessStatus}
            setGuessStatus={setGuessStatus}
            guessIndex={guessIndex}
            setGuessIndex={setGuessIndex}
            fullGuess={fullGuess}
            setFullGuess={setFullGuess}
            WOTD={WOTD}
            setStartTimer={setStartTimer}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            setPauseTimer={setPauseTimer}
            time={time}
            setTime={setTime}
        />
    );
};

export default GamesPage;
