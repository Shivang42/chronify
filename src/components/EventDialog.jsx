import { TextField, Dialog, DialogContent } from "@mui/material";
import Close from '../assets/close.svg?react'
import { useState } from "react";

const VITE_SERVER_URL = `http://localhost:3000`
const createEvent = async (createFunc,token)=>{
    let form = new FormData(document.forms['newevent']);
    let body = {
        sdate:form.get('sdate'),stime:form.get('stime'),
        edate:form.get('edate'),etime:form.get('etime'),
        summary:document.querySelector("input[name='summary']").value
    };
    try{
        await createFunc(body,token);
    }
    catch(e){
        window.alert(e.toString());
    }
}
const EventDialog = ({ setOpen,open , createEventRequest,token}) => {
    const [summary,setSummary] = useState('');
    return <Dialog open={open} style={{ background: '#27272712' ,overflow:'hidden'}}>
        <form name='newevent' id='newevent' action={`${VITE_SERVER_URL}/`} className="hidden"></form>
        <DialogContent sx={{ minWidth:'120px',width: '40vw', background: '#272727', padding: 0 }}>
            <strong className="grid grid-cols-[auto_3rem] p-2 text-center text-white text-4xl text-[#272727] min-h-[60px] h-[10%] "><strong>Add event </strong><Close style={{display:'block'}} height="2rem" width="2rem" onClick={()=>{setOpen(false)}}/></strong>
            <fieldset form="newevent" className='flex flex-col gap-y-8 bg-slate-200 p-2 items-center justify-between w-full min-h-[200px] overflow-hidden'>
                <TextField value={summary} onChange={(e)=>{setSummary(e.target.value)}} sx={{ outline:'none',background: 'white', width: '80%', height: '2.5rem' }} name="summary" form="newevent" placeholder="Enter your event name" />
                <span className="flex w-2/3 min-w-[80px] h-[50px] gap-x-2">
                    <input name="sdate" type="date" form="newevent" className="w-2/5"/><input name="stime" type="time" form="newevent" className="w-1/3"/>
                </span>
                <span className="flex w-2/3 min-w-[80px] h-[50px] gap-x-2">
                    <input name="edate" type="date" form="newevent" className="w-2/5"/><input name="etime" type="time" form="newevent" className="w-1/3"/>
                    <button onClick={createEvent.bind(null,createEventRequest,token)} className='bg-[var(--highlight)] rounded-[0.4rem] p-2 text-white hover:brightness-[.95]'>Submit</button>
                </span>
            </fieldset>
        </DialogContent>

    </Dialog>
};

export default EventDialog;
