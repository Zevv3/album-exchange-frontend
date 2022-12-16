import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';

import './styles.css'
import { firebaseConfig } from './firebaseConfig';
import { Home } from './components/Home'
import { Profile } from './components/Profile'
import { SignIn, SignUp } from './components/SignIn'
import { Exchange } from './components/Exchange'
import { Search } from './components/Search'
import { store } from './redux/store'
import { theme } from './Theme/themes'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path='/' element={<Home title={'Album Exchange'} />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/exchange' element={<Exchange />} />
              <Route path='/search' element={<Search />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
