import React, { useEffect } from "react";
import { Paper, Box } from "@mui/material";
import Timer from "./Timer";

export default function StopWatch({ startTimer, setStartTimer, pauseTimer, setPauseTimer, time, setTime }) {

    useEffect(() => {
        let interval = null;

        if (startTimer && pauseTimer === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [startTimer, pauseTimer]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2, textAlign: 'center' }}>
                <Timer time={time} />
            </Paper>
        </Box>
    );
}
