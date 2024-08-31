import {useEffect, useState} from "react";
import {fetchFriends} from "./hooks/useFetchFriends.js";
import {Card, CardContent, Grid, Typography} from '@mui/material';

export default function FriendListContainer() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const friendships = async () => {
            const response = await fetchFriends();
            setFriends(response.friends);
        }
        friendships();
    }, [])

    return (
        <div>
            <h2>Current Friends</h2>
            <Grid margin={'0 auto'} width={'200px'}>
                {friends.map((friend) => (
                    <Grid item xs={12} sm={6} md={4} key={friend.friend}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {friend.friend}
                                </Typography>
                                <Typography color="textSecondary">
                                    Since: {new Date(friend.since).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}