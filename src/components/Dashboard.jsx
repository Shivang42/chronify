import Axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';
import EventDialog from './EventDialog.jsx';
import Cookies from 'js-cookie';
import Add from '../assets/add.svg?react';
import '../Dashboard.css';

const VITE_SERVER_URL = `http://localhost:3000`
const reshape = (arr, n) => {
    let res = [];
    for (var i = 0; i < arr.length / n; i++) {
        let entry = [];
        for (var j = 0; j < n; j++) {
            let en = arr[(i * n) + j];
            if (en) {
                entry.push(en);
            }
        }
        res.push(entry);
    }
    return res;
}
const createEventRequest = async (payload, token) => {
    let { status } = await Axios.post(VITE_SERVER_URL + `/scheduler/events/create?token=${token}`, payload);
    if (status == 200) {
        window.location.reload();
    }
}
const fetchList = async (token) => {
    let { data } = await Axios.get(VITE_SERVER_URL + `/scheduler/calendars/list?token=${token}`);
    return data;
}
const fetchCalendar = async (token, id) => {
    let safeid = encodeURIComponent(id);
    let { data } = await Axios.put(VITE_SERVER_URL + `/scheduler/calendar/get?token=${token}`, { cid: id });
    return data;
}
const fetchEvents = async (token, id = '') => {
    let safeid = encodeURIComponent(id);
    let { data } = id == '' ? (await Axios.put(VITE_SERVER_URL + `/scheduler/calendar/events?token=${token}`)) : (await Axios.put(VITE_SERVER_URL + `/scheduler/calendar/events?token=${token}`, { cid: id }));
    return data;
}
const modifyInfo = (e) => {
    if (e.target.className.includes('addInfo')) {
        e.target.parentElement.style.height = 'calc(clamp(160px,60%,180px) + 4.5rem)';
        e.target.parentElement.querySelector('.info').classList.toggle('hidden');
        e.target.innerText = 'Hide info';
        e.target.classList.remove('addInfo'); e.target.classList.add('remInfo');
    } else if(e.target.className.includes('remInfo')){
        e.target.parentElement.style.height = 'calc(clamp(160px,60%,180px))';
        e.target.parentElement.querySelector('.info').classList.toggle('hidden');
        e.target.innerText = 'Read more';
        e.target.classList.remove('remInfo'); e.target.classList.add('addInfo');
    }

}

function Dashboard() {
    const [open, setOpen] = useState(false); const [search, setSearch] = useState('');
    const [appToken, setToken] = useState(Cookies.get('datanexify-token'));
    const [params, setParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    const isSmall = useMediaQuery({ query: '(max-width:400px)' }); const isMedium = useMediaQuery({ query: '(min-width:400px) and (max-width:900px)' }); const isBig = useMediaQuery({ query: '(min-width:900px)' });
    useEffect(() => {
        let token = params.get('token');
        if (token) {
            Cookies.set('datanexify-token', token, { expires: 1 });
            window.location.href = window.location.origin + '?signin=true';
            setToken(token);
        }
    }, [params.get('token')]);
    useEffect(() => {
        document.title = 'Chronify';
        if (appToken) {
            fetchList(appToken).then((data) => fetchEvents(appToken)).then((cal) => { setEvents(cal.items) })
                .catch((e) => {
                    if (e.response.data.err = 'Token expired') {
                        Cookies.remove('datanexify-token'); window.location.href = window.location.origin;
                    }
                });
        } else {
            window.location.href = window.location.origin;
        }

    }, []);
    return <>
        <EventDialog setOpen={setOpen} token={appToken} createEventRequest={createEventRequest} open={open} />
        <div className='dashboard w-[80vw] min-h-[80px] h-[90vh] p-2 flex flex-col items-center justify-start gap-y-2 rounded-[.3rem]'>
            <div className='h-[120px] w-full p-1 col-start-1 col-end-4 flex justify-around items-center bg-[#272727] '>
                <TextField sx={{ display: 'grid', '& .MuiInputBase-input': { color: '#dddddd92', fontSize: '1.3rem', height: '100%', borderRadius: '1rem', outline: 'none', border: '0px solid white' }, width: '80%', height: '85%', background: '#ffffff12', borderRadius: '1.9rem' }} onChange={(e) => { setSearch(e.target.value) }} value={search} placeholder={'Enter title here to search for your event ...'} />
                <Button onClick={setOpen.bind(null, true)} sx={{ aspectRatio: '1', height: '80%', borderRadius: '50%', color: 'var(--primary)' }}><Add height="100%" width="100%" style={{ color: "var(--highlight)" }} /></Button>
            </div>
            <div className='events w-full h-full p-3 flex flex-col gap-y-2 items-center overflow-y-scroll'>
                {
                    (events.length > 0) ? reshape(events.filter((event) => ((new RegExp(`(${search})[a-zA-Z ]+`, 'i')).test(event.summary))), isSmall ? 1 : (isMedium ? 2 : 3)).map((row) => {
                        return <div className=' flex w-full h-fit items-start gap-x-[3%] transition-[all_1s_ease-in-out]'>
                            {
                                row.map((event) =>
                                    <Card sx={{ cursor: 'pointer', transition: 'all .2s ease-in-out !important', gridTemplateColumns: 'max(28px,20%) auto', border: '4px solid gray', display: 'grid', rowGap: '12%', columnGap: 'clamp(2px,3%,6px)', background: 'white repeating-linear-gradient(-45deg,#27272722 0%,#27272732 20%,#27272722 100%)', placeItems: 'center', width: 'clamp(230px,30%,420px)', color: '#272727d3', textAlign: 'left', height: 'clamp(160px,60%,180px)', fontSize: '1.2rem', padding: 'clamp(.2rem,5%,1.2rem)', fontWeight: 'bolder' }}>
                                        <div className='h-[40px] w-full flex flex-col gap-y-2'>
                                            <img className='bg-[white] rounded-full h-fit aspect-square' src='/calendar.svg'></img>
                                        </div>
                                        <p className='grid place-content-center w-full h-[6rem] text-[1.2rem] p-1 font-[bahnschrift] font-normal'>{event.summary}</p>
                                        <p className='hidden info block text-sm col-start-1 col-end-3 h-[40px] w-full p-1'>
                                            <div className='w-full h-full flex flex-col justify-between '>
                                                <span className='flex text-[white] items-center justify-between'>
                                                    <span className='flex bg-[#272727] flex-col text-[#ddd] w-[45%] items-center rounded-[.8rem] p-1'>
                                                        <b className='block text-[1rem] rounded-[.8rem] p-1'>{new Date(event.start.dateTime).toLocaleDateString()}</b>
                                                        <b className='block text-[.7rem] rounded-[.8rem] p-1'>{new Date(event.start.dateTime).toLocaleTimeString()}</b>
                                                    </span>
                                                    <strong className='text-[#272727]'>_____</strong>
                                                    <span className='flex bg-[#272727] flex-col text-[#ddd] w-[45%] items-center  rounded-[.8rem] p-1'>
                                                        <b className='block text-[1rem] rounded-[.8rem] p-1'>{new Date(event.end.dateTime).toLocaleDateString()}</b>
                                                        <b className='block text-[.7rem] rounded-[.8rem] p-1'>{new Date(event.end.dateTime).toLocaleTimeString()}</b>
                                                    </span>
                                                </span>
                                            </div>
                                        </p>
                                        <button onClick={modifyInfo} className='addInfo block col-start-1 text-md col-end-3 text-[white] bg-black w-full h-[35px]'>Read more</button>

                                    </Card >
                                )
                            }

                        </div >
                    }) : (new Array(2)).fill((new Array(isSmall ? 1 : (isMedium ? 2 : 3))).fill(0)).map((row) => {
                        return <div className='flex w-full items-start gap-x-[3%] transition-[all_1s_ease-in-out]'>
                            {row.map((i) => (<Card sx={{ animation: 'shimmering 1s infinite ease-in-out', gridTemplateColumns: 'max(28px,20%) auto', border: '4px solid gray', display: 'grid', columnGap: 'clamp(2px,3%,6px)', background: '#272727 repeating-linear-gradient(-45deg,#fffffff5 0%,#ffffffa2 50%,#fffffff2 100%)', width: '75%', color: '#ffffffd3', height: '200px', padding: '1.2rem' }}>

                            </Card>))}
                        </div>
                    })
                }
            </div >
        </div ></>
}

export default Dashboard;