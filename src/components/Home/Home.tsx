import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { NavBar } from '../sharedComponents';
import records from '../../assets/images/records.jpg'

interface Props {
    title: string
};

const Root = styled('div')({
    padding:0,
    margin: 0
});

const Main = styled("main")({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(6, 85, 121, 1)), url(${records});`,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "absolute",
  });
  const MainText = styled("div")({
    textAlign: "center",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
  });

const SearchContainer = styled('div')({
    position: 'relative',
    width: '50px',
    deight: '50px',
    boxSizing: 'border-box',
    borderRadius: '50px',
    border: '4px solid #393e46',
    padding: '5px',
    background: '#222831',
    transition: 'all 0.5s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});

const SearchInput = styled('input')({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '42px',
    lineHeight: '30px',
    outline: '0',
    fontSize: '2rem',
    borderRadius: '20px',
    padding: '0 20px',
    margin: '0',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    appearance: 'none'
});


export const Home = (props:Props) => {
    const targetRef = useRef(document.createElement('input'));
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const showSearchInput = isHovered || isFocused;
    const navigate = useNavigate();

    useEffect(() => {
        targetRef.current.value = ''
    },[showSearchInput])

    return (
        <Root>
          <NavBar />
          <Main>
            <MainText className="main-home">
              <Typography variant="h1">{props.title}</Typography>
              <Typography variant="body1">Welcome to the Album Exchange! With this app, you can add albums to your profile and submit them to the exchange.</Typography>
              <Typography variant='body1'>The Exchange will randomly pair you with a partner and you will each listen to the other's album and submit a rating and a review.</Typography>
              <Typography variant='body1'></Typography>
              <br />
              <br />
  
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                alignItems="center"
                justifyContent="center">
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => navigate("/profile")}>Go to Profile</Button>
                </div>
  
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate("/exchange")}>Go to Exchange</Button>
                </div>
              </Stack>
            </MainText>
          </Main>
        </Root>
      );
  }