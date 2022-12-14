import React, { useState } from 'react';
import { Drawer as MUIDrawer,
    ListItem, 
    List, 
    ListItemText, 
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    CssBaseline, 
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight,ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { Navbar } from '../sharedComponents';
import { DataTable } from '../DataTable'

const Root = styled('div')({
    padding: 0,
    margin: 0
});

const Container = styled('div')({
    display: 'flex',

})

export const Profile = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDrawerOpen = () =>{
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClickClose = () => {
        setDialogOpen(false);
    };

    let userId = localStorage.getItem('userId')

    return (
        <Root>
            <Navbar />
            <h1>Welcome back to the Album Exchange!</h1>
            <h3>Below, you can view the albums you have favorited and submit any of them to the next Exchange.</h3>
            <p>Your Token: {userId}</p>
            <DataTable />
        </Root>

    )
}