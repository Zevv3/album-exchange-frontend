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
import { serverCalls } from '../../api';
import { useGetExchange } from '../../custom-hooks';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
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
      field: 'release_date',
      headerName: 'Release Date',
      width: 150,
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
      headerName: 'Tracks',
      width: 75,
      editable: true,
    },
    {
      field: 'label',
      headerName: 'Label',
      width: 200,
      editable:true
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 75,
      editable: true
    },
    {
      field: 'review',
      headerName: 'Review',
      width: 700,
      editable: true
    }
];

interface gridData{
    data:{
      id?:string;
    };
};

export const ExchangeTable = () => {
    let { exchangeData, getData } = useGetExchange();
    let [gridData, setData] = useState<GridSelectionModel>([]);

    return (
        <div style={{ height: 400, width: '100%', backgroundColor: 'beige' }}>
            <DataGrid
                rows={exchangeData}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {setData(newSelectionModel)}}
                {...exchangeData}
            />
        </div>
    )
}