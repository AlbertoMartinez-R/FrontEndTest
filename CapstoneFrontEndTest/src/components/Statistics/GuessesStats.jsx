import {useEffect, useState} from 'react';
import {fetchGuessStats} from "./hooks/useFetchStatistics.js";
import {Box, Typography} from '@mui/material';
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

    console.log(guesses);

    const pieData = [
        {name: 'Guess 1', value: guesses.guess_1 || 0},
        {name: 'Guess 2', value: guesses.guess_2 || 0},
        {name: 'Guess 3', value: guesses.guess_3 || 0},
        {name: 'Guess 4', value: guesses.guess_4 || 0},
        {name: 'Guess 5', value: guesses.guess_5 || 0},
        {name: 'Guess 6', value: guesses.guess_6 || 0},
    ];

    return (
        <>
            <div>
                <Typography variant="h6" gutterBottom>Guesses</Typography>
                {/* Updated layout with side-by-side alignment and equal size */}
                <Box display="flex" justifyContent="center" alignItems="center" maxWidth="100%" gap={2}>
                    {/* PieChart */}
                    <Box flex={1} display="flex" justifyContent="center">
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
                    </Box>
                    {/* BarChart */}

                    <Box flex={1} display="flex" justifyContent="center">
                        <BarChart
                            series={[{data: [
                                    guesses.guess_1,
                                    guesses.guess_2,
                                    guesses.guess_3,
                                    guesses.guess_4,
                                    guesses.guess_5,
                                    guesses.guess_6
                                ]}]}
                            yAxis={[{scaleType: 'band', data: ['1st', '2nd', '3rd', '4th', '5th', '6th',]}]}
                            barLabel="value"
                            bottomAxis={null}
                            height={400}
                            width={400}
                            layout={"horizontal"}
                        />
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default GuessesStats;
