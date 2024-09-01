import { useNavigate } from 'react-router-dom';
import { Button, Box, Paper, Typography } from '@mui/material';
import WordsTab from "../components/Admin/WordsTab.jsx";
import UsersTab from "../components/Admin/UsersTab.jsx";
import CalendarTab from "../components/Admin/CalendarTab.jsx";

export default function AdminDashboardPage() {

    return (
        <Box sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Admin Dashboard
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Paper sx={{ flex: 1, mr: 2, p: 2 }}>
                    <WordsTab />
                </Paper>
                <Paper sx={{ flex: 1, ml: 2, p: 2 }}>
                    <UsersTab />
                </Paper>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Paper sx={{ flex: 1, maxWidth: '700px', p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CalendarTab />
                </Paper>
            </Box>
        </Box>
    );
}
