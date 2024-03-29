import React, {useState} from 'react';
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { getAuth,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    onAuthStateChanged} from 'firebase/auth'
import { 
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress,
    Box,
    CssBaseline
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form'

import records from '../../assets/images/records.jpg'
import { Input, Input2, NavBar } from '../sharedComponents';

const signinStyles = {
    googleButton:{
        backgroundColor: 'rgb(66, 133, 244',
        margin: '2em',
        padding: 0,
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeiight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo:{
        width: '48px',
        height:'48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle: {
        marginTop: '2em'
    },
    snackBar: {
        color: 'white',
        backgroundcolor: '#4caf50'
    }
};

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
};

const NavA = styled(Link) ({
    display: 'block',
    color: 'black',
    fontFamily: 'sans-serif',
    marginBottom: '20px'
});

const Root = styled('div')({
    padding:0,
    margin: 0
});

const Alert = (props:AlertProps) => {
    return <MUIAlert elevation={6} variant='filled'/>
};

interface buttonProps {
    open?: boolean,
    onClick: () => void
};

interface userProps {
    email?: any,
    password?: any
};


export const GoogleButton = (props:buttonProps) =>{
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
    const signIn = async () =>{
        await signInWithGoogle()
        localStorage.setItem('auth', 'true')
        onAuthStateChanged(auth, (user) => {

        if (user) {
        localStorage.setItem('userId', user.uid)
        if (user.email) {
            localStorage.setItem('userEmail', user.email);
        }};
    });
        navigate('/profile')
    };
    const signUsOut = async () => {
        await signOut(auth)
        localStorage.setItem( 'auth', 'false')
        navigate('/signin')
    };
    if (loading) {
        return <CircularProgress />
    };
    let MyAuth = localStorage.getItem('auth')

    if (MyAuth == "true"){
        return (
            <Button variant='contained' color='secondary' onClick={signUsOut}>Sign Out</Button>
        )
    } else {
        return (
            <Button sx={signinStyles.googleButton} onClick={signIn}>Sign In With Google</Button>
        )
    };
};

export const SignIn = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({});
    const auth = getAuth();
    const handleSnackOpen = () => {
        setOpen(true)
    };
    const handleSnackClose = () => {
        setOpen(false)
        navigate('/profile')
    };
    const onSubmit = async (data:any, event:any) => {
        console.log(data.email, data.password);
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                localStorage.setItem('auth', 'true')
                const user = userCredential.user
                localStorage.setItem('userId', user.uid)
                localStorage.setItem('userEmail', data.email)
                console.log(localStorage.getItem('userEmail'))
                navigate('/profile')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message);
            })
    };
    
    return (
        <Root>
           <CssBaseline />
            <NavBar />
            <Box sx={ myStyles.content }>
            <h1>Hidden text for spacing</h1>
            <h6>More spacing</h6>
        <Container maxWidth='sm' sx={signinStyles.containerStyle} style={{backgroundColor: 'beige'}}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign In Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Your Email Here' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Input2 {...register('password')} name='password' placeholder='Your Password Here' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
            <NavA to='/signup'>Don't Have and Account? Register Now!!</NavA>
            <GoogleButton open={open} onClick={handleSnackClose} />
            <Snackbar message='Success' open={open} autoHideDuration={3000}>
                <Alert severity='success'>
                    <AlertTitle>Successful Sign In --- Redirecting to Your Profile...</AlertTitle>
                </Alert>
            </Snackbar>
        </Container>
        </Box>
        </Root>
    );
};

export const SignUp = (props:userProps) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({});
    const auth = getAuth();

    const handleSnackOpoen = () => {
        setOpen(true)
    };
    const handleSnackClose = () => {
        setOpen(false)
    };
    const onSubmit = async (data:any, event:any) => {
        console.log(data.email, data.password);
        console.log(auth);
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                console.log(userCredential)
                const user = userCredential.user;
                console.log(user)
                navigate('/signin')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    return (
        <Root>
            <CssBaseline />
            <NavBar />
            <Box sx={ myStyles.content }>
            <h1>Hidden text for spacing</h1>
            <h6>More spacing</h6>
        <Container maxWidth='sm' sx={signinStyles.containerStyle} style={{backgroundColor: 'beige'}}>
            <Typography sx={signinStyles.typographyStyle}>
                Create Your Account Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input  {...register('email')} name='email' placeholder='enter email here...' />
                </div>
                <div>
                    <label htmlFor='password'>Password - 6 character minimum</label>
                    <Input2  {...register('password')} name='password' placeholder='enter password here' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
            <GoogleButton open={open} onClick={handleSnackClose} />
            <Snackbar message='Success' open={open} autoHideDuration={3000}>
                <Alert severity='success'>
                    <AlertTitle>Succesful Sign Up --- Redirecting...</AlertTitle>
                </Alert>
            </Snackbar>
        </Container>
        </Box>
        </Root>
    );
};