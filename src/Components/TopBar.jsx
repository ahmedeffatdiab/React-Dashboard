import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../Context/AuthContext';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

//Search 
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function TopBar({ open, handleDrawerOpen, setMode }) {
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate()
    const { logout, currentUser } = useAuth();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open2 = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        setAnchorEl(null);
        navigate("/login");
    };

    const handleRegister = () => {
        setAnchorEl(null);
        navigate("/register");
    };

    const handleLogOut = async () => {
        setError("");
        setLoading(true);
        try {
            setAnchorEl(null);
            await logout()
            navigate("/Pie");

        } catch (err) {
            setError("LogOut");
        }
        setLoading(false)
    };


    let theme = useTheme()
    function fn_changeMode() {
        localStorage.setItem("myMode", theme.palette.mode === 'dark' ? 'light' : 'dark');
        setMode((prevMode) =>
            prevMode === 'light' ? 'dark' : 'light',
        );
    }

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>


                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>


                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>


                <Box flexGrow={1} />



                <Stack direction={'row'} >

                    {theme.palette.mode == "light" ?
                        <IconButton aria-label="delete" color='inherit' onClick={fn_changeMode}>
                            <LightModeOutlinedIcon />
                        </IconButton>
                        :
                        <IconButton aria-label="delete" color='inherit' onClick={fn_changeMode}>
                            <DarkModeOutlinedIcon />
                        </IconButton>
                    }


                    <IconButton aria-label="delete" color='inherit'>
                        <NotificationsOutlinedIcon />
                    </IconButton>

                    <IconButton aria-label="delete" color='inherit'>
                        <SettingsOutlinedIcon />
                    </IconButton>

                    <Box>
                        <IconButton
                            aria-label="delete"
                            color='inherit'
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <Person2OutlinedIcon />
                        </IconButton>

                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open2}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {
                                currentUser ?
                                    <Box>
                                        {/* <MenuItem disabled={loading} onClick={handleUpdate}>Update Profile</MenuItem> */}
                                        <MenuItem disabled={loading} onClick={handleLogOut}>Logout</MenuItem>
                                    </Box>
                                    : <Box>
                                        <MenuItem onClick={handleLogin}>Login</MenuItem>
                                        <MenuItem onClick={handleRegister}>Register</MenuItem>
                                    </Box>
                            }


                        </Menu>
                    </Box>

                </Stack>


            </Toolbar>
        </AppBar>
    )
}
