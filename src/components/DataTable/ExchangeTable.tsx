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
import { ExchangeReviewForm } from '../AlbumForm';


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
    },
    {
      field: 'user_token',
      headerName: 'User',
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
    let token = localStorage.getItem('userId')
    let { exchangeData, getData } = useGetExchange();
    let [openReview, setOpenReview] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([]);
    console.log(exchangeData)
  // let startExchange = async (exchangeData) => {
    /**I want this to randomize the user token assigned to each album
     * I'll have to collect the user_token when it is submitted though
     * Also, I probably shouldn't display the token on this screen.
     */
  // }
    let handleOpenReview = () => {
      setOpenReview(true);
    };
    let handleCloseReview = () => {
      setOpenReview(false);
    };
    let clearExchange = () => {
      serverCalls.clearExchange(token);
      getData()
    };
    let startExchange = () => {
      serverCalls.startExchange(token);
      getData()
    }

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
            {/* <Button variant='contained' color='secondary' onClick={deleteData}>Delete</Button> */}
            <Button variant='contained' color='secondary' onClick={handleOpenReview}>Review</Button>
            {/* <Button variant='contained' color='secondary'>Start an Exchange!</Button> */}
            <Dialog open={openReview} onClose={handleCloseReview} aria-labelledby="form-dialog-title">
              <DialogTitle id='form-dialog-title'>Review Your Album</DialogTitle>
              <DialogContent>
                <DialogContentText>Album id: {gridData[0]}</DialogContentText>
                <ExchangeReviewForm id={`${gridData[0]}`} />
                <DialogActions>
                  <Button onClick={handleCloseReview} color='primary'>Cancel</Button>
                  <Button onClick={handleCloseReview} color='primary'>Done</Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
            <Button variant='contained' color='secondary' onClick={startExchange}>Start Exchange!</Button>
            <Button variant='contained' color='secondary' onClick={clearExchange}>Clear Exchange</Button>
        </div>
    )
}