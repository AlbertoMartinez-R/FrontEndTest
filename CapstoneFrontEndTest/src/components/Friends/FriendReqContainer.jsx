import {useEffect, useState} from "react";
import {requestsList, acceptFriendRequest, declineFriendRequest} from "../../hooks/useFetchFriends.js";
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';

export default function FriendReqContainer() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const allRequests = async () => {
            const response = await requestsList();
            setRequests(response.requests);
        }
        allRequests();
    }, []);

    const handleAcceptClick = async (friend_username) => {
        const response = await acceptFriendRequest(friend_username);
        if (response) {
            setRequests(prevRequests => prevRequests.filter(request => request.friend_username !== friend_username));
        }
    };

    const handleDeclineClick = async (friend_username) => {
        const response = await declineFriendRequest(friend_username);
        if (response) {
            setRequests(prevRequests => prevRequests.filter(request => request.friend_username !== friend_username));
        }
    };

    const receivedRequests = requests.filter(request => request.request_type === "received");
    const sentRequests = requests.filter(request => request.request_type === "sent");

    return (
        <div>
            <h2>Pending Requests</h2>

            <Grid margin={'0 auto'} width={'400px'} container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Received Requests</Typography>
                    {receivedRequests.map((request, index) => (
                        <Card key={index} sx={{marginBottom: 2}}>
                            <CardContent>
                                <Typography variant="body1">
                                    {request.user_username}
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(request.created_at).toLocaleString('en-US', {
                                        year: 'numeric',
                                        day: '2-digit',
                                        month: '2-digit',
                                    })}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAcceptClick(request.user_username)}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeclineClick(request.user_username)}
                                    style={{marginLeft: 8}}
                                >
                                    Decline
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">Sent Requests</Typography>
                    {sentRequests.map((request, index) => (
                        <Card key={index} sx={{marginBottom: 2}}>
                            <CardContent>
                                <Typography variant="body1">
                                    {request.friend_username}
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(request.created_at).toLocaleString(
                                        'en-US', {
                                            year: 'numeric',
                                            day: '2-digit',
                                            month: '2-digit',
                                        }
                                    )}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}