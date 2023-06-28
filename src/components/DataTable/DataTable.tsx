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
import { useGetData } from '../../custom-hooks';
import { AlbumForm, UpdateForm, ReviewForm } from '../AlbumForm';

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
  
  export const DataTable = () => {
      let { albumData, getData } = useGetData();
      let [openUpdate, setOpenUpdate] = useState(false);
      let [openReview, setOpenReview] = useState(false);
      let [gridData, setData] = useState<GridSelectionModel>([]);
      let token = localStorage.getItem('userId')
      let email = localStorage.getItem('userEmail')
  
      let handleOpenUpdate = () => {
        setOpenUpdate(true);
      };
      let handleCloseUpdate = () => {
        setOpenUpdate(false);
      };
      let handleOpenReview = () => {
        setOpenReview(true);
      };
      let handleCloseReview = () => {
        setOpenReview(false);
      };
      let deleteData = () => {
        console.log(`${gridData[0]}`);
        serverCalls.delete(`${gridData[0]}`);
        getData()
      };
      let sendToExchange = async () => {
        let album = await serverCalls.getOne(token, `${gridData[0]}`)
        serverCalls.sendToExchange(token, email, album)
      };
  
      console.log(gridData)
      const MyAuth = localStorage.getItem('auth');
      console.log(MyAuth)

      if (MyAuth == 'true') {
      return (
          <div style={{ height: 400, width: '100%', backgroundColor:'beige' }}>
            <DataGrid
                rows={albumData}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {setData(newSelectionModel)}}
                {...albumData}
            />
            <Button variant='contained' color='secondary' onClick={handleOpenUpdate}>Update</Button>
            <Button variant='contained' color='secondary' onClick={deleteData}>Delete</Button>
            <Button variant='contained' color='secondary' onClick={handleOpenReview}>Review</Button>
            <Button variant='contained' color='secondary' onClick={sendToExchange}>Send to Exchange</Button>
            {/* sendToExchange would just make the api call to the get one endpoint to send to new database */}
            {/* Dialogs */}
            <Dialog open={openUpdate} onClose={handleCloseUpdate} aria-labelledby="form-dialog-title">
              <DialogTitle id='form-dialog-title'>Update An Album's information</DialogTitle>
              <DialogContent>
                <DialogContentText>Album id: {gridData[0]}</DialogContentText>
                <UpdateForm id={`${gridData[0]}`} />
                <DialogActions>
                  <Button onClick={handleCloseUpdate} color='primary'>Cancel</Button>
                  <Button onClick={handleCloseUpdate} color='primary'>Done</Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
            <Dialog open={openReview} onClose={handleCloseReview} aria-labelledby="form-dialog-title">
              <DialogTitle id='form-dialog-title'>Review Your Album</DialogTitle>
              <DialogContent>
                <DialogContentText>Album title: {gridData[1]}</DialogContentText>
                <ReviewForm id={`${gridData[0]}`} />
                <DialogActions>
                  <Button onClick={handleCloseReview} color='primary'>Cancel</Button>
                  <Button onClick={handleCloseReview} color='primary'>Done</Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </div>
      )
      } else {
        return (
          <div>
            <h3>Please Sign In To View Your Album Collection</h3>
          </div>
        )
      }
  }