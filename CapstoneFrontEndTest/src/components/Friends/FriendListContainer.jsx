import {useEffect, useState} from "react";
import {deleteFriend, fetchFriends} from "./hooks/useFetchFriends.js";
import {Box, Card, CardContent, IconButton, Pagination, Paper, Tooltip, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FriendListContainer() {
    const [friends, setFriends] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const friendsPerPage = 5;
    const totalPages = Math.ceil(friends.length / friendsPerPage);


    const friendships = async () => {
        const response = await fetchFriends();
        setFriends(response.friends);
    }



    useEffect(() => {
        friendships();
    }, []);



    const handleDeleteFriend = async (friend_username) => {
        await deleteFriend(friend_username);
        await friendships();
    }


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const displayFriends = friends.slice((currentPage - 1) * friendsPerPage, currentPage * friendsPerPage);

    return (<Paper elevation={3} sx={{
        width: '250px',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '600px',
        margin: '10px'
    }}>
        <Typography variant="h6" gutterBottom textAlign="center">Current Friends</Typography>
        <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center"
             gap={2}>
            {displayFriends.length > 0 ? (displayFriends.map((friend) => (
                <Card key={friend.friend} sx={{width: '100%'}}>
                    <CardContent sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '15px 15px 15px 15px'
                    }}>
                        <Box flexGrow={1}>
                            <Typography variant="h6" component="div" sx={{textAlign: 'center'}}>
                                {friend.friend}
                            </Typography>
                            <Typography color="textSecondary" sx={{textAlign: 'center'}}>
                                Since: {new Date(friend.since).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Tooltip title="Delete" sx={{color: 'red'}}>
                            <IconButton
                                onClick={() => handleDeleteFriend(friend.friend)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </CardContent>
                </Card>))) : (<Typography variant="body1" textAlign="center">No friends</Typography>)}
            {/* Fill remaining space with empty cards if less than 5 friends */}
            {Array.from({length: friendsPerPage - displayFriends.length}).map((_, index) => (
                <Card key={`empty-${index}`} sx={{width: '100%', visibility: 'hidden'}}>
                    <CardContent/>
                </Card>))}
        </Box>
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}
            siblingCount={0}
            boundaryCount={1}
            showFirstButton
            showLastButton
        />
    </Paper>);
}
