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
import { AlbumForm } from '../AlbumForm';
import { theme } from "../../Theme/themes";

const Root = styled('div')({
    padding: 0,
    margin: 0
});

const Container = styled('div')({
    display: 'flex',

})

const myStyles = {
    appBar: {
        transition: theme.transitions.create(['margin, width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    toolbar: {
        display: 'flex',
    },
    toolbar_button: {
        marginLeft: 'auto',
        backgroundColor: theme.palette.primary.contrastText,
    },
    headerText: {
        textAlign: 'left',
    }
};

export const Profile = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

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
            <h2>Albums In Your Library</h2>
            <Button sx = { myStyles.toolbar_button } onClick={handleDialogClickOpen}>Add An Album</Button>
                <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>Add New Album</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Add A New Album</DialogContentText>
                        <AlbumForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {handleDialogClickClose} color = 'primary'>Cancel</Button>
                    </DialogActions>
                </Dialog>
            
            <DataTable />
        </Root>

    )
};