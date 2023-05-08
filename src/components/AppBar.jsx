import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Tooltip,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function myAppBar({ forceUpdate }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = async () => {
        try {
            await signOut(auth);
            handleClose();
            forceUpdate();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Movies
                    </Typography>
                    {auth.currentUser ? (
                        <>
                            <Tooltip title="Account settings">
                                <IconButton
                                    elevation={2}
                                    onClick={handleClick}
                                    size="small"
                                    sx={{
                                        ml: 2,
                                        position: "absolute",
                                        right: 4,
                                    }}
                                    aria-controls={
                                        open ? "account-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                >
                                    <Avatar
                                        sx={{ width: 32, height: 32 }}
                                        src={auth.currentUser.photoURL}
                                    >
                                        U
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        ""
                    )}
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
