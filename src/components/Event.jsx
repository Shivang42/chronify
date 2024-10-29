import Axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import {Card} from '@mui/material';

const appendInfo = (e) => {
    e.target.parentElement.style.height = 'calc(clamp(160px,60%,180px) + 4.5rem)';
    e.target.parentElement.querySelector('.info').classList.toggle('hidden');
    e.target.innerText = 'Hide info';
    e.target.onclick = removeInfo;
}
const removeInfo = (e) => {
    e.target.parentElement.style.height = 'calc(clamp(160px,60%,180px) - 4.5rem)';
    e.target.parentElement.querySelector('.info').classList.toggle('hidden');
    e.target.innerText = 'Read more';
    e.target.onclick = appendInfo;
}
function Event({ event }) {
    const [listener,setListener] = useState(appendInfo);
    return <Card sx={{ cursor: 'pointer', transition: 'all .2s ease-in-out !important', gridTemplateColumns: 'max(28px,20%) auto', border: '4px solid gray', display: 'grid', rowGap: '12%', columnGap: 'clamp(2px,3%,6px)', background: 'white repeating-linear-gradient(-45deg,#27272722 0%,#27272732 20%,#27272722 100%)', placeItems: 'center', width: 'clamp(230px,30%,420px)', color: '#272727d3', textAlign: 'left', height: 'clamp(160px,60%,180px)', fontSize: '1.2rem', padding: 'clamp(.2rem,5%,1.2rem)', fontWeight: 'bolder' }}>
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
                    <strong> ___ </strong>
                    <span className='flex bg-[#272727] flex-col text-[#ddd] w-[45%] items-center  rounded-[.8rem] p-1'>
                        <b className='block text-[1rem] rounded-[.8rem] p-1'>{new Date(event.end.dateTime).toLocaleDateString()}</b>
                        <b className='block text-[.7rem] rounded-[.8rem] p-1'>{new Date(event.end.dateTime).toLocaleTimeString()}</b>
                    </span>
                </span>
            </div>
        </p>
        <button onClick={(e)=>{if(listener==appendInfo){appendInfo(e);setListener(removeInfo)}else{removeInfo(e);setListener(appendInfo)}}} className='block col-start-1 text-md col-end-3 text-[white] bg-black w-full h-[35px]'>Read more</button>

    </Card >;
}
export default Event;