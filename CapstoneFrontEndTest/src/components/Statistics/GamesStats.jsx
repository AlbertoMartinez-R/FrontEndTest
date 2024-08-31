import {useEffect, useState} from "react";
import {fetchGameStats} from "./hooks/useFetchStatistics";
import {Grid, Paper, Typography} from "@mui/material";

function GameStats() {
    const [gameStats, setGameStats] = useState([]);

    useEffect(() => {
        const stats = async () => {
            const res = await fetchGameStats();
            setGameStats(res)
        };
        stats();

    }, []);

    return (
        <>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={4} sm={3}>
                    <Paper elevation={1} sx={{padding: 2}}>
                        <Typography variant="h6" align="center">{gameStats.regular_games}</Typography>
                        <Typography variant="body2" align="center">Normal Games</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Paper elevation={1} sx={{padding: 2}}>
                        <Typography variant="h6" align="center">{gameStats.overall_games}</Typography>
                        <Typography variant="body2" align="center">Total Games</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Paper elevation={1} sx={{padding: 2}}>
                        <Typography variant="h6" align="center">{gameStats.timed_games}</Typography>
                        <Typography variant="body2" align="center">Timed Games</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default GameStats;