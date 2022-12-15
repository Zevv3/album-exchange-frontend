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
    Stack,
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

import records from '../../assets/images/records.jpg'
import { NavBar } from '../sharedComponents';
import { DataTable, ExchangeTable } from '../DataTable'
import { AlbumForm } from '../AlbumForm';
import { theme } from "../../Theme/themes";

const myStyles = {
    content: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(6, 85, 121, 1)), url(${records});`,
        width: "100%",
        height: "1250px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "absolute"
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
}

export const Exchange = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <NavBar />
            <Box sx={ myStyles.content }>
                <h1>Hidden text for spacing</h1>
                <h6>More spacing</h6>
                <h1>Here, you can view the albums in the current album exchange</h1>
                <h2>Albums in Exchange:</h2>
                <ExchangeTable />
            </Box>
        </Box>
    )
}