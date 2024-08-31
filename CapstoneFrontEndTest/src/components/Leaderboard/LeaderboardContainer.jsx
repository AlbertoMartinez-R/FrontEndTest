import {useEffect, useState} from 'react';
import {fetchLeaderboard} from "./hooks/useFetchLeaderboard.js";
import {Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material';

export default function LeaderboardContainer() {
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        const board = async () => {
            const response = await fetchLeaderboard();
            setLeaderboard(response);
        };
        board();
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                {/* Left Section */}
                <Grid item xs={9}>
                    <Paper elevation={3} style={{marginBottom: '20px', padding: '20px'}}>
                        <Typography variant="h6" gutterBottom>
                            Top 10 Timed Scores
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="right">Timed Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaderboard?.timed_scores?.map((entry, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{entry.username}</TableCell>
                                        <TableCell align="right">{entry.timed_score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                    <Paper elevation={3} style={{padding: '20px'}}>
                        <Typography variant="h6" gutterBottom>
                            Current Streaks
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="right">Current Streak</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaderboard?.current_streaks?.map((entry, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{entry.username}</TableCell>
                                        <TableCell align="right">{entry.current_streak}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                {/* Right Section */}
                <Grid item xs={3}>
                    <Paper elevation={3} style={{padding: '20px', textAlign: 'center'}}>
                        <Typography variant="h6" gutterBottom>
                            Max Streak User
                        </Typography>
                        <Typography variant="subtitle1">
                            {leaderboard?.max_streak_user?.username}
                        </Typography>
                        <Typography variant="h4" color="secondary">
                            {leaderboard?.max_streak_user?.max_streak}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

        </>
    );
}
