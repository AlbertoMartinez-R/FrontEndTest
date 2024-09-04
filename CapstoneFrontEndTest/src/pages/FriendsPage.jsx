import FriendListContainer from "../components/Friends/FriendListContainer.jsx";
import FriendReqContainer from "../components/Friends/FriendReqContainer.jsx";
import {Box, Paper, Typography} from "@mui/material";
import SearchFriendContainer from "../components/Friends/SearchFriendContainer.jsx";



const FriendsPage = () => {
    return (
        <Box sx={{justifyContent: "center", padding: "10px" }} >
            <Typography variant="h4" component="div">
                Manage Friends
            </Typography>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <FriendListContainer/>
                <SearchFriendContainer/>
                <FriendReqContainer/>
            </Box>
        </Box>
    );
};

export default FriendsPage;