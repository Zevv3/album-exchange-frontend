import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { Search } from '@mui/icons-material';

const NavBarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

const Logo = styled('h1')({
    margin: '0 0 0 0.45em'
});

const LogoA = styled(Link)({
    color: 'rgb(28,24,22)',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
});

const CoreNav = styled('h1')({
    listStyle: 'none',
    textTransofrm: 'uppercase',
    textDecoration: 'none',
    display: 'flex'
});

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'black'
});

export const Navbar = () => {
    return (
        <NavBarContainer>
        <Logo>
            <LogoA to='/'>Album Exchange</LogoA>
        </Logo>
        <CoreNav>
            <li>
                {/* I could do a whole page for search or I could also just have a search bar in the navbar
                I think having it in the navbar might complicate things for me with figuring out how to make
                the api call i.e. knowing if they are searching for an artist or an album or a song. I could
                have an expanding little search icon that allows for radio button selections to know what kind
                info the user is trying to search for. Yeah, I like that idea. */}
                {/* <Search>Search icon</Search> */}
                {/* <SearchContainer>
                    <SearchInput ref={targetRef} showSearchInput={showSearchInput} />
                </SearchContainer> */}
                {/* This shit is NOT working... I'm just making a separate page for it for now */}
                <NavA to='/search'>Search</NavA>
            </li>
            <li>
                <NavA to='/'>Home</NavA>
            </li>
            <li>
                <NavA to='/exchange'>Exchange</NavA>
            </li>
            <li>
                <NavA to='/profile'>Profile</NavA>
            </li>
            <li>
                <NavA to='/signin'>Sign In</NavA>
            </li>
            <li>
                <NavA to='/signup'>Sign Up</NavA>
            </li>
        </CoreNav>
    </NavBarContainer>
    )
}