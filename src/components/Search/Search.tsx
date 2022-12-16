import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, 
        FormControl, 
        FormLabel, 
        RadioGroup, 
        FormControlLabel, 
        Radio, 
        TextField,
        CssBaseline ,
        Box,
        Container
    } from '@mui/material';
import { styled } from '@mui/system';
import { chooseTitle, 
        chooseArtist, 
        chooseReleaseDate, 
        chooseGenre,
        chooseLabel, 
        chooseTracks,
        chooseDeezerId,
        chooseCover,
        chooseUser,
        chooseRating,
        chooseReview
    } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { NavBar } from '../sharedComponents';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

import records from '../../assets/images/records.jpg'

interface SearchProps {
    id?: string;
    data?: {};
    value?: string;
};

interface AlbumState {
    album_title: string;
    artist_name: string;
    release_date: string;
    genre: string;
    number_of_tracks: number;
    label: string;
    deezer_id: string;
    cover_url: string;
};

const Root = styled('div')({
    padding:0,
    margin: 0
});

const myStyles = {
    content: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(6, 85, 121, 1)), url(${records});`,
        width: "100%",
        height: "1250px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "absolute",
    },
};

export const Search = (props:SearchProps) => {
    const dispatch = useDispatch();
    let { albumData, getData } = useGetData();
    const store = useStore();
    const { register, handleSubmit } = useForm({  });

    // From MUI material docs on radio buttons
    const [value, setValue] = React.useState('search');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };

    const onSubmit = async (data:any, event:any) => {
        console.log(value)
        
    }

    return (
        <Root>
           <CssBaseline />
            <NavBar />
            <Box sx={ myStyles.content }>
            <h1>Hidden text for spacing</h1>
            <h6>More spacing</h6>
            <h1>Even More Spacing</h1>
        <Container style={{backgroundColor: 'beige'}}>
            <FormControl>
                <TextField id='outlined-basic' label='Search' variant='outlined' />
                <FormLabel id='demo-row-radio-buttons-group-label'>Search For...</FormLabel>
                <RadioGroup
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    defaultValue='search'
                    name='demo-row-radio-buttons-group-label'
                >
                    <FormControlLabel value='albums' control={<Radio />} label='Albums' />
                    <FormControlLabel value='artists' control={<Radio />} label='Artists' />
                    <FormControlLabel value='songs' control={<Radio />} label='Songs' />
                </RadioGroup>
                <Button type='submit' variant='contained' color='secondary' onClick={handleSubmit(onSubmit)}>Search</Button>
            </FormControl>
        </Container>
        </Box>
        </Root>
    )
}