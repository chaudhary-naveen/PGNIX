import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddNewPg from './AddNewPg';
import React ,{useState} from 'react';

const OwnerNameSection = ({ownerName})=>{
    const [open, setOpen] = React.useState(false);
    return <>

        <Box sx={{display:"flex",gap:2,fontWeight:700,alignItems:"center",justifyContent:"space-between"}}>
            <div>
                <span style={{fontSize:"2rem"}}>{`Welcome!`} </span>
                <span className='text-red-500' style={{display:"inline-block",fontSize:"3rem"}}>{`${ownerName}`}</span>
            </div>
            <div>
               
                 <Button variant="contained" onClick={()=>{setOpen(!open)}}>+ Add Property </Button>
                {
                    open? <AddNewPg open={open} setOpen={setOpen}/>:null
                }
            </div>
        </Box>
    </>

}
export default OwnerNameSection