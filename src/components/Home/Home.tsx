import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { Search } from '@mui/icons-material';

import { Navbar } from '../sharedComponents';

interface Props {
    title: string
};

const Root = styled('div')({
    padding:0,
    margin: 0
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

// TODO AFTER ADDING AUTHENTICATION
// if you want only some things to show up if not signed in, you have to make a separate navbar
// and do if user is authenticated, display this navbar, if not display this other one
export const Home = (props:Props) => {
    const targetRef = useRef(document.createElement('input'));
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const showSearchInput = isHovered || isFocused;

    useEffect(() => {
        targetRef.current.value = ''
    },[showSearchInput])

    return (
        <Root>
           <Navbar />
            <h1>Hello World</h1>
        </Root>
    )
}