import {useEffect, useState} from "react";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    Paper,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {deleteRequest, getUsernames, requestsList, sendFriendRequest} from "./hooks/useFetchFriends.js";
import DeleteIcon from "@mui/icons-material/Delete.js";


export default function SearchFriendContainer() {

    const [allUsers, setAllUsers] = useState([]); // Array of all users fetched from the API
    const [searchQuery, setSearchQuery] = useState(""); // Input value in the search bar
    const [selectedUser, setSelectedUser] = useState(""); // The username selected or typed in
    const [outlineColor, setOutlineColor] = useState(""); // Outline color for input box
    const [sentRequests, setSentRequests] = useState([]);

    const fetchData = async () => {
        const response = await getUsernames();
        setAllUsers(response);

        const requestsData = await requestsList();
        setSentRequests(requestsData.pending.filter(req => req.request_type === "sent"));
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleSendRequest = async (selectedUser) => {
        await sendFriendRequest(selectedUser);
        await fetchData();
    };

    const handleDeleteRequestClick = async (friend_username) => {
        await deleteRequest(friend_username);
        await fetchData();
    };

    const handleInputChange = (event, value) => {
        setSearchQuery(value);

        if (allUsers.includes(value)) {
            setSelectedUser(value);
            setOutlineColor("green");
        } else {
            setSelectedUser("");
            setOutlineColor("red");
        }
    };

    return (
        <Paper elevation={3} sx={{
            padding: 2,
            width: '100%',
            maxWidth: '250px',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '600px'
        }}>
            <Box>
                <Autocomplete
                    freeSolo
                    options={allUsers}
                    inputValue={searchQuery}
                    onInputChange={handleInputChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search for a user"
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: 2,
                                marginBottom: 2,
                                borderColor: outlineColor,
                                borderWidth: '2px',
                                borderStyle: 'solid',
                            }}
                        />
                    )}
                />
                <Button
                    variant="contained"
                    fullWidth
                    sx={{backgroundColor: outlineColor === "green" ? "green" : "red"}}
                    onClick={() => handleSendRequest(selectedUser)}
                    disabled={!selectedUser}
                >
                    Send Friend Request
                </Button>
            </Box>


            <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>Pending Response</Typography>
                {sentRequests.map((request, index) => (
                    <Card key={index} sx={{paddingBottom:'0', height: '30px', marginBottom: '3px', width: '235px'}}>
                        <CardContent sx={{padding: '2px 10px 1px', paddingBottom: '24px', display:'flex', justifyContent: 'space-between', alignItems: 'center', height: '25px'}}>
                            <Typography variant="body1" sx={{paddingBottom: '0px', justifyContent: 'center'}}>
                                {request.friend_username}

                            </Typography>
                            <Typography>
                                {new Date(request.created_at).toLocaleString('en-US', {
                                    year: 'numeric',
                                    day: '2-digit',
                                    month: '2-digit',
                                })}

                            </Typography>

                            <Tooltip title="Delete" sx={{padding: 0, color: 'red'}}>
                                <IconButton
                                    onClick={() => handleDeleteRequestClick(request.friend_username)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Paper>
    );
}
