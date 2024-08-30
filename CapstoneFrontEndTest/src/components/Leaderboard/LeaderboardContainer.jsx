import {useEffect, useState} from 'react';
import {fetchLeaderboard} from "./hooks/useFetchLeaderboard.js";

export default function LeaderboardContainer() {
    const [leaderboard, setleaderboard] = useState(null);

    useEffect(() => {
        const board = async () => {
            await fetchLeaderboard();
            setleaderboard(board);
        };
        board();
    }, []);
    return (
        <>

        </>
    );
}