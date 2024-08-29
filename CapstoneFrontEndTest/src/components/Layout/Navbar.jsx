import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth.js";

const Navbar = () => {

    const { isAdmin } = useAuth()
    return (
        <AppBar className="navbar">
            <Toolbar className="toolbar">
                <Typography variant="h6" className="title">
                    <Link to="/" className="link">
                        WordleGame
                    </Link>
                </Typography>
                <div className="nav-links">
                    <Button color="inherit" component={Link} to="/games">
                        Games
                    </Button>
                    <Button color="inherit" component={Link} to="/friends/:username/friend-list">
                        Friends
                    </Button>
                    <Button color="inherit" component={Link} to="/statistics">
                        Statistics
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                    <Button color="inherit" component={Link} to="/register">
                        Register
                    </Button>
                    {isAdmin && (
                        <Button color="inherit" component={Link} to="/admin">
                            Admin Dashboard
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;