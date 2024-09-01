import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { fetchWordOfTheDay } from "./hooks/useFetchWords.js";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function CalendarTab() {
    const [date, setDate] = useState(dayjs());
    const [wotd, setWotd] = useState('');
    const navigate = useNavigate();

    const handleCalandarClick = () => {
        navigate('/admin/dashboard/months')
    };

    useEffect(() => {
        const getWordOfTheDay = async () => {
            const wotdData = await fetchWordOfTheDay();
            if (wotdData) {
                setDate(dayjs(wotdData.date));  // Use the date from the response
                setWotd(wotdData.wotd);         // Use the WOTD from the response
            }
        };
        getWordOfTheDay();
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <Paper sx={{ p: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        disabled
                        value={date}
                        onChange={() => { }}
                        disablePast
                        disableFuture
                        disableHighlightToday={false}
                    />
                </LocalizationProvider>
            </Paper>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Paper sx={{ p: 2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Typography textAlign="center" variant="h6">
                        <Box>
                            {wotd ? `Word of the Day ` : "Loading Word of the Day..."}
                        </Box>
                        {`"${wotd}"`}
                    </Typography>
                </Paper>
                <Button variant="contained" color="primary" onClick={handleCalandarClick}>
                    See Calendar
                </Button>
            </Box>
        </Box>
    );
}
