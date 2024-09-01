import {useState} from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {Box} from "@mui/material";


export default function AllMonthlyWords() {
    const months = Array.from({length: 12}, (_, i) => dayjs().month(i).format('DD MMMM YYYY'));

    const [selectedDate, setSelectedDate] = useState(dayjs());

    return (
        <>
            <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        views={["month", "day"]}
                        openTo="day"
                        defaultValue={dayjs('2024-08-29')}
                    />
                </LocalizationProvider>
            </Box>
        </>
    );
}