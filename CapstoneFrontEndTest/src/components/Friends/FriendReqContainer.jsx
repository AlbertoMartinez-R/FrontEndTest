import { useEffect, useState } from "react";
import { requestsList, acceptFriendRequest, declineFriendRequest, deleteRejectedRequest } from "./hooks/useFetchFriends.js";
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';

export default function FriendReqContainer() {
    const [requests, setRequests] = useState({ pending: [], accepted: [], rejected: [] });

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await requestsList();
            if (data) {
                setRequests(data);
            }
        };
        fetchRequests();
    }, []);

    const handleAcceptClick = async (friend_username) => {
        await acceptFriendRequest(friend_username);
        setRequests(prevRequests => ({
            ...prevRequests,
            pending: prevRequests.pending.filter(req => req.friend_username !== friend_username),
            accepted: [...prevRequests.accepted, prevRequests.pending.find(req => req.friend_username === friend_username)]
        }));
    };

    const handleDeclineClick = async (friend_username) => {
        await declineFriendRequest(friend_username);
        setRequests(prevRequests => ({
            ...prevRequests,
            pending: prevRequests.pending.filter(req => req.friend_username !== friend_username),
            rejected: [...prevRequests.rejected, prevRequests.pending.find(req => req.friend_username === friend_username)]
        }));
    };

    const handleDeleteClick = async (user_username, friend_username) => {
        await deleteRejectedRequest(user_username, friend_username);
        setRequests(prevRequests => ({
            ...prevRequests,
            rejected: prevRequests.rejected.filter(req => req.user_username !== user_username || req.friend_username !== friend_username)
        }));
    };

    const { pending = [], accepted = [], rejected = [] } = requests;

    const receivedRequests = pending.filter(req => req.request_type === "received");
    const sentRequests = pending.filter(req => req.request_type === "sent");

    return (
        <div>
            <h2>Pending Requests</h2>

            <Grid margin={'0 auto'} width={'400px'} container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Received Requests</Typography>
                    {receivedRequests.map((request, index) => (
                        <Card key={index} sx={{ marginBottom: 2 }}>
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
                                    style={{ marginLeft: 8 }}
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
                        <Card key={index} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="body1">
                                    {request.friend_username}
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(request.created_at).toLocaleString('en-US', {
                                        year: 'numeric',
                                        day: '2-digit',
                                        month: '2-digit',
                                    })}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

                {/* Rejected Requests Section */}
                <Grid item xs={12}>
                    <Typography variant="h5">Rejected Requests</Typography>
                    {rejected.map((request, index) => (
                        <Card key={index} sx={{ marginBottom: 2 }}>
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
                                    color="error"
                                    onClick={() => handleDeleteClick(request.user_username, request.friend_username)}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}