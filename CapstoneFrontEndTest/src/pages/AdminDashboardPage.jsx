import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import WordsTab from "../components/Admin/WordsTab.jsx";
import UsersTab from "../components/Admin/UsersTab.jsx";


export default function AdminDashboardPage() {

    const navigate = useNavigate();

    const handleWordClick = () => {
        navigate('/admin/dashboard/words');
    };

    const handleUserClick = () => {
        navigate('/admin/dashboard/users');
    }

    return (
        <>
            <h1>Admin Dashboard</h1>
            <WordsTab/>
            <Button onClick={handleWordClick}>See All Words</Button>
            <UsersTab/>
            <Button onClick={handleUserClick}>See All Users</Button>
        </>
    )
}