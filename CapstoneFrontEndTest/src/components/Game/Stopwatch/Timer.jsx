import React from "react";
import { Typography, Box } from "@mui/material";

export default function Timer(props) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            <Typography variant="h4" component="span">
                {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
            </Typography>
            <Typography variant="h4" component="span">
                {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
            </Typography>
            <Typography variant="h6" component="span">
                {("0" + ((props.time / 10) % 100)).slice(-2)}
            </Typography>
        </Box>
    );
}
