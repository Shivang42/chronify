import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButton, Button, Snackbar, Alert } from '@mui/material';
import Cookies from 'js-cookie';
import { Auth } from './assets';

import './App.css'

const VITE_SERVER_URL = `http://localhost:3000`

function App() {
  const [params, setParams] = useSearchParams();

  useEffect(()=>{
    document.title = 'Chronify';
  },[]);

  return <>
    <Snackbar onClose={() => { console.log('Finished') }} open={(!Cookies.get('datanexify-token') && params.get('signin') == 'false') || params.get('signin') == 'true'} autoHideDuration={600} >
      <Alert
        severity={(!Cookies.get('datanexify-token') && params.get('signin') == 'false') ? "error" : "success"}
        variant="filled"
        sx={{ width: '100%', background: '#e20000a4' }}
      >
        {(params.get('signin') == 'true') ? 'You have signed up successfully' : ((!Cookies.get('datanexify-token') && params.get('signin') == 'false') ? 'Sorry, could not authenticate you ...' : 'You are not signed in')} </Alert>
    </Snackbar>

    <div className='flex overflow-hidden flex-col justify-center sm:flex-row md:flex-row lg:flex-row items-center gap-x-8 h-[70vh] w-[80vw] p-1'>
      <div className='z-2 clock h-[110%] w-full sm:w-1/2 md:w-1/2 lg:w-[33%] overflow-hidden'>
      </div>
      <div className='z-10 flex flex-col gap-y-3 w-[60%] h-full justify-center md:items-start lg:items-start items-center'>
        <strong style={{ textShadow: '0 0 1rem var(--primary)', WebkitTextStroke: '2px', WebkitTextStrokeColor: 'var(--primary)' }} className='text-[4rem]  md:text-[6rem] lg:text-[6rem] text-[white] font-light  drop-shadow-[0_0_14px_var(--primary)]'>Chronify</strong>
        {!Cookies.get('datanexify-token') ? (<IconButton onClick={() => { window.location.replace(VITE_SERVER_URL + "/auth/google") }} sx={{ width: 'clamp(8rem,50%,12rem)', color: 'var(--highlight)', justifySelf: 'end', borderRadius: '1rem', border: '2px solid var(--highlight)', '&:hover': { background: 'var(--highlight) ' }, color: 'white' }}>
          <Auth height='25' width='25' color="parent" />
          <strong style={{ textShadow: '0 0 1.4rem var(--highlight)', WebkitTextStroke: '2px', letterSpacing: '.1rem' }} className='signBut text-[var(--highlight)] font-normal hover:text-white text-sm'>Signup</strong>
        </IconButton>) : (
          <IconButton onClick={() => { window.location.replace('/dashboard') }} sx={{ width: 'clamp(8rem,50%,12rem)', color: 'var(--secondary)', justifySelf: 'end', borderRadius: '1rem', border: '2px solid var(--secondary)', '&:hover': { background: 'var(--secondary) ' }, color: 'white' }}>
            <Auth height='25' width='25' color="parent" />
            <strong style={{ textShadow: '0 0 1.4rem var(--secondary)', WebkitTextStroke: '2px', letterSpacing: '.1rem' }} className='signBut text-[var(--secondary)] font-normal hover:text-white text-sm'>View Dashboard</strong>
          </IconButton>)
        }
      </div>
    </div></>;
}

export default App
