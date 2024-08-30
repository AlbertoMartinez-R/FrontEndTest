import {useEffect, useState} from 'react';
import {adminfetchUsers} from "./hooks/useFetchUsers.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const response = await adminfetchUsers();
            setUsers(response);
        };
        getAllUsers();
    }, [])

    return (
        <>
            <h1>
                All Users
            </h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>Banned</TableCell>
                            <TableCell>Join Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.is_admin ? "Yes" : "No"}</TableCell>
                                <TableCell>{user.is_banned ? "Yes" : "No"}</TableCell>
                                <TableCell>{new Date(user.join_date).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
};