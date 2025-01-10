import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slice/customerSlice";
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Box, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, currentCustomer } = useSelector((state) => state.customer);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleProfileMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <AppBar position="fixed" sx={{ top: 0, backgroundColor: "#b3e5fc", minHeight: "50px" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    {currentCustomer?.name === "manager" && (

                        <Button
                            component={Link}
                            to="/add-suite"
                            sx={{
                                color: "#ff3366",
                                fontWeight: "bold",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                textTransform: "none",
                                fontSize: "16px"
                            }}
                        >
                         הוספת-סוויטה-מנהל
                        </Button>)}
                    <Box sx={{ position: "absolute", top: "0", left: "0", width: "100vw", zIndex: -1, overflow: "hidden" }}>
                        <marquee
                            behavior="scroll"
                            direction="left"
                            scrollamount="8"
                            style={{
                                fontSize: "1.2rem",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <span style={{ color: "violet" }}>🍭מבצעים מיוחדים על סוויטות! הזמינו עכשיו וחסכו בגדול </span>
                            <span style={{ color: "blue" }}> 🍭</span>
                        </marquee>
                    </Box>
                    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-evenly', width: '100%' }}>
                        <Button
                            component={Link}
                            to="/"
                            sx={{
                                color: "#ff6600",
                                fontWeight: "bold",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                textTransform: "none",
                                fontSize: "16px"
                            }}
                        >
                        🍭דף הבית
                        </Button>
                        <Button
                            component={Link}
                            to="/suitesSearch"
                            sx={{
                                color: "#ff3366",
                                fontWeight: "bold",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                textTransform: "none",
                                fontSize: "16px"
                            }}
                        >
                            🍭חיפוש חופשי
                        </Button>
                        <Button
                            component={Link}
                            to="/suitDisplay"
                            sx={{
                                color: "#33cc33",
                                fontWeight: "bold",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                textTransform: "none",
                                fontSize: "16px"
                            }}
                        >
                            🍭סוויטות&תגובות
                        </Button>
                        <Button
                            component={Link}
                            to="/about"
                            sx={{
                                color: "#3399ff",
                                fontWeight: "bold",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                textTransform: "none",
                                fontSize: "16px"
                            }}
                        >
                            🍭קצת עלינו
                        </Button>
                    </div>

                    {isLoggedIn ? (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0,
                                    margin: 0,
                                }}
                            >

                                <IconButton
                                    onClick={handleProfileMenu}
                                    sx={{
                                        padding: 0,
                                        margin: 0,
                                        backgroundColor: 'transparent',
                                        '&:hover': { backgroundColor: 'transparent' },
                                        border: 'none',
                                    }}
                                >
                                    <img
                                        src={`data:image/jpeg;base64,${currentCustomer.image}`}
                                        alt="Profile"
                                        style={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid red',
                                        }}
                                    />
                                </IconButton>

                            </Box>

                            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                                <MenuItem onClick={() => { navigate("/profile"); handleCloseMenu(); }}>
                                    {currentCustomer?.username || "הפרופיל שלי"}
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>יציאה מהחשבון שלי</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <Button component={Link} to="/login" color="error" startIcon={<LoginIcon />}>
                                    היכנס
                                </Button>
                                <Button component={Link} to="/signup" color="error" startIcon={<PersonAddIcon />}>
                                    הירשם
                                </Button>
                            </Box>

                        </>
                    )}

                </Toolbar>
            </AppBar>

            <style>{`
            @keyframes rainbow {
              0% { color: #ff0000; }
              14% { color: #ff7f00; }
              28% { color: #ffff00; }
              42% { color: #00ff00; }
              57% { color: #0000ff; }
              71% { color: #4b0082; }
              85% { color: #9400d3; }
              100% { color: #ff0000; }
            }
    
            marquee span {
              display: inline-block;
              animation: rainbow 4s linear infinite;
              font-weight: bold;
              font-family: 'Arimo', sans-serif;
              text-transform: none;
              font-size: 20px;
              white-space: nowrap;
            }
          `}</style>
        </>
    );
};

export default Navbar;
