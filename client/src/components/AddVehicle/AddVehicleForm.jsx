import React, { useState } from 'react'
import AddVehiclePage from '../../Pages/AddVehiclePage'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
function AddVehicleForm() {
   const navgate=useNavigate()
    const [fuel, setfuel] = useState('')
    const [closeform, setcloseform] = useState(false)
    const [manufacture, setmanufacture] = useState('')
    const [vehiclename, setvehiclename] = useState('')
    const [regno, setregno] = useState('')
    const [kilometer, setkilometer] = useState('')
    const [manufactureyear, setmanufactureyear] = useState('')
    const [err, seterr] = useState('')
    const closeForm=()=>{
        setcloseform(true)
    }
    const handleSubmit=(e)=>{
        e.preventDefult();
        if(manufacture.trim() && vehiclename.trim()&& regno.trim()&&kilometer.trim()&&fuel.trim()&&manufactureyear.trim()){
            axios.post('/user/addvehicle',{manufacture,vehiclename,regno,kilometer,fuel,manufactureyear}).then((response)=>{
                if(!response.data.err){
                    navgate('/addvehicle')
                }else{
                    seterr(response.data.message)
                }
            })
        }else{
            seterr("All fields are required")
        }
            

    }
  return (
    closeform ?<AddVehiclePage/> :
    <div className='vehicle-background'>
      <div className='vehicle-inner-div'>
        <h4 className='heading'>Add Vehicle</h4>
        <button onClick={()=>closeForm()} className='vehicle-btn' >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
             </button>
             <div>
             <div className='vehicle-user'>
  <div className='vehicle-connect'>
  </div>
  <div className='vehicle-classic'>
  <p className='errorMessage'>{err}</p>
    <form style={{ marginTop:'-43px' }} className='Form' >
      <fieldset className='username'>
        <input type="text" placeholder="Manufacture"  value={manufacture} onChange={(e)=>setmanufacture(e.target.value)} required/>
      </fieldset>
      <fieldset className='email'>
        <input type="text" placeholder="Vehicle name" value={vehiclename} onChange={(e)=>setvehiclename(e.target.value)} required/>
      </fieldset>
      <fieldset className='password'>
        <input type="text" placeholder="Reg no" value={regno} onChange={(e)=>setregno(e.target.value)}   required/>
      </fieldset>
      <fieldset className='password'>
        <input type="number" placeholder="Kilometer" value={kilometer} onChange={(e)=>setkilometer(e.target.value)}  required/>
      </fieldset>
         <FormControl sx={{ m: 1, minWidth: 250 ,}} size='small'> 
           <InputLabel style={{ fontSize:'14px', marginTop:'5px' }}  id="demo-simple-select-helper-label">Fuel type</InputLabel>
          <Select
           labelId="demo-simple-select-helper-label"
           id="demo-simple-select-helper"
           multiple
             value={fuel}
            onChange={(event) => setfuel(event.target.value)}
          className="select-input" // Add a custom CSS class
           >
        <MenuItem value="">
        </MenuItem>
        <MenuItem value={'Petrol'}>Petrol</MenuItem>
        <MenuItem value={'Diesel'}>Diesel</MenuItem>
        <MenuItem value={'Eletric'}>Eletric</MenuItem> </Select>
        </FormControl>
      <fieldset className='password'>
        <input type="text" placeholder="Manufacture year"  value={manufactureyear} onChange={(e)=>setmanufactureyear(e.target.value)}   required/>
      </fieldset>
      <button type="submit" style={{ color:'white' }}  className="btn">submit</button>
      
    </form>

  </div>
</div>
             </div>
      </div>
    </div>
  )
}

export default AddVehicleForm
