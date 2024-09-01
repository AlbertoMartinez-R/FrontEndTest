import * as React from 'react';
import {useState, useEffect} from 'react'
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth.js";

const centerPages = ['Game', 'Leaderboard'];

function ResponsiveAppBar() {
    const { isAuthenticated, isAdmin, user, logout } = useAuth();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect(() => {
        // Forces the component to re-render when authentication status changes
    }, [isAuthenticated, isAdmin, user]);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAccountClick = () => {
        if (isAuthenticated) {
            navigate(`/account`);
        } else {
            navigate(`/authenticate`);
        }
        handleCloseUserMenu();
    };

    const handleMenuClick = (path) => {
        navigate(path);
        handleCloseUserMenu();
    };

    return (
        <AppBar position="absolute">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Wordle
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {centerPages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => handleMenuClick(`/${page.toLowerCase()}`)}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleAccountClick}>
                                <Typography textAlign="center">Account</Typography>
                            </MenuItem>
                            {isAuthenticated && (
                                [
                                    <MenuItem key="statistics" onClick={() => handleMenuClick('/statistics')}>
                                        <Typography textAlign="center">Statistics</Typography>
                                    </MenuItem>,
                                    <MenuItem key="friends" onClick={() => handleMenuClick(`/friends/${user?.username}/friend-list`)}>
                                        <Typography textAlign="center">Friends</Typography>
                                    </MenuItem>
                                ]
                            )}
                            {isAdmin && (
                                <MenuItem key="admin" onClick={() => handleMenuClick('/admin')}>
                                    <Typography textAlign="center">Admin Dashboard</Typography>
                                </MenuItem>
                            )}
                            {isAuthenticated && (
                                <MenuItem key="logout" onClick={logout}>
                                    <Typography textAlign="center">Log Out</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
