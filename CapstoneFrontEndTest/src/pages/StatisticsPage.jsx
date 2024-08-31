import {Box, Divider} from '@mui/material';
import StatsUser from "../components/Statistics/UserStats.jsx";
import GameStats from "../components/Statistics/GamesStats.jsx";
import GuessStats from "../components/Statistics/GuessesStats.jsx";

const StatisticsPage = () => {

    return (<div className="statistics-page">
        <Box sx={{padding: 2}}>
            <StatsUser/>
            <Divider sx={{my: 1}}/>
            <GameStats/>
            <Divider sx={{my: 5}}/>
            <GuessStats/>
        </Box>

    </div>);
};

export default StatisticsPage;