import {useEffect, useState} from 'react';
import {fetchGuessStats} from "./hooks/useFetchStatistics.js";
import {Box, Typography, Paper} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import {BarChart} from '@mui/x-charts/BarChart';

function GuessesStats() {
    const [guesses, setGuesses] = useState([]);

    useEffect(() => {
        const stats = async () => {
            const res = await fetchGuessStats();
            setGuesses(res);
        };
        stats();
    }, []);

    const totalGuesses = Object.values(guesses).reduce((acc, guess) => acc + (guess || 0), 0);
    function calculatePercentage(value, total) {
        return Math.round((value / total) * 100);
    }

    const pieData = [
        {
            id: 'Guess 1',
            value: calculatePercentage(guesses.guess_1 || 0, totalGuesses),
        },
        {
            id: 'Guess 2',
            value: calculatePercentage(guesses.guess_2 || 0, totalGuesses),
        },
        {
            id: 'Guess 3',
            value: calculatePercentage(guesses.guess_3 || 0, totalGuesses),
        },
        {
            id: 'Guess 4',
            value: calculatePercentage(guesses.guess_4 || 0, totalGuesses),
        },
        {
            id: 'Guess 5',
            value: calculatePercentage(guesses.guess_5 || 0, totalGuesses),
        },
        {
            id: 'Guess 6',
            value: calculatePercentage(guesses.guess_6 || 0, totalGuesses),
        },
    ];

    return (
        <>
            <div>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>Guesses</Typography>
                    {/* Main layout with side-by-side boxes for PieChart and BarChart */}
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {/* PieChart section */}
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '30%' }}>
                            <Typography variant="subtitle1" gutterBottom>Percentages</Typography>
                            <Paper elevation={2} sx={{ padding: 2 }}>
                                <PieChart
                                    series={[
                                        {
                                            data: pieData,
                                            innerRadius: 50,
                                            outerRadius: 140,
                                            paddingAngle: 0,
                                            cornerRadius: 25,
                                            startAngle: 0,
                                            endAngle: 360,
                                            cx: 150,
                                            cy: 150,
                                            highlightScope: {fade: 'global', highlight: 'item'},
                                            faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
                                        }
                                    ]}
                                    height={300}
                                    width={300}
                                />
                            </Paper>
                        </Box>
                        {/* BarChart section */}
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '30%' }}>
                            <Typography variant="subtitle1" gutterBottom>Distribution</Typography>
                            <Paper elevation={2} sx={{ padding: 2 }}>
                                <BarChart
                                    series={[{
                                        data: [
                                            guesses.guess_1,
                                            guesses.guess_2,
                                            guesses.guess_3,
                                            guesses.guess_4,
                                            guesses.guess_5,
                                            guesses.guess_6
                                        ]
                                    }]}
                                    yAxis={[{scaleType: 'band', data: ['1st', '2nd', '3rd', '4th', '5th', '6th',]}]}
                                    barLabel="value"
                                    bottomAxis={null}
                                    height={300}
                                    width={300}
                                    layout={"horizontal"}
                                />
                            </Paper>
                        </Box>
                    </Box>
                </Paper>
            </div>
        </>
    )
}

export default GuessesStats;
