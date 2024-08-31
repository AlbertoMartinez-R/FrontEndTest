import {useEffect, useState} from "react";
import {fetchUserStats} from "./hooks/useFetchStatistics";
import {Grid, Paper, Typography, Divider} from "@mui/material";

function StatsUser() {
    const [userStats, setUserStats] = useState([]);
    useEffect(() => {
        const stats = async () => {
            const res = await fetchUserStats();
            setUserStats(res);
        };
        stats();
    }, []);

    const date = new Date(userStats.join_date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <>
            <Typography variant="h3">{userStats.username} 's Stats </Typography>
            <Divider sx={{my: 1}} />

            <Grid container spacing={3} justifyContent={"center"}>
                <Grid item xs={4} sm={3}>
                    <Paper elevation={1} sx={{padding: 2}}>
                        <Typography variant="h6" align="center">{date}</Typography>
                        <Typography variant="body2" align="center">Joined Date</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Paper elevation={1} sx={{padding: 2}}>
                        <Typography variant="h6" align="center">{userStats.word_count}</Typography>
                        <Typography variant="body2" align="center">Words Solved</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Paper elevation={1} sx={{padding: 2}}>
                        <Typography variant="h6" align="center">{userStats.current_streak}</Typography>
                        <Typography variant="body2" align="center">Current Streak</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Paper elevation={1} sx={{padding: 2}}>
                        <Typography variant="h6" align="center">{userStats.max_streak}</Typography>
                        <Typography variant="body2" align="center">Max Streak</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Paper elevation={1} sx={{padding: 2}}>
                        <Typography variant="h6" align="center">{userStats.timed_score}</Typography>
                        <Typography variant="body2" align="center">Timed Score</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default StatsUser;