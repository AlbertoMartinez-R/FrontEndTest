import {useEffect, useState} from 'react';
import {adminfetchUsers} from "./hooks/useFetchUsers.js";
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function UsersTab() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    const handleUserClick = () => {
        navigate('/admin/dashboard/users');
    };

    useEffect(() => {
        const getMinUsers = async () => {
            try {
                const response = await adminfetchUsers();
                const minUsers = response.slice(0, 5); // Limiting to the first 5 users
                setUsers(minUsers);
            } catch (error) {
                console.error('Failed to fetch users!', error);
            }
        };
        getMinUsers();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                <Button variant="contained" color="primary" onClick={handleUserClick}>
                    See All Users
                </Button>
            </Box>

        </>
    );
}



