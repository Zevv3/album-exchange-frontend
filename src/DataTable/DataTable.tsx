import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { getAuth } from 'firebase/auth';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    // I would like to add a column that is just the cover art
    // I'll use the cover_url and display that image... hopefully
    {
      field: 'album_title',
      headerName: 'Album title',
      width: 350,
      editable: true,
    },
    {
      field: 'artist_name',
      headerName: 'Artist name',
      width: 200,
      editable: true,
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 110,
      editable: true,
    },
    {
      field: 'genre',
      headerName: 'Genre',
      width: 100,
      editable: true,
    },
    {
      field: 'number_of_tracks',
      headerName: 'Number Of Tracks',
      width: 75,
      editable: true,
    },
    {
      field: 'label',
      headerName: 'Label',
      width: 200,
      editable:true
    }
];

interface gridData{
    data:{
      id?:string;
    };
  };
  

export const DataTable = () => {
    return (
        <h1>Data Table Here</h1>
    )
}