import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from '../../axios'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import './EditMechanicProfile.css'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MechanicaProfile from './MechanicProfile'
import { useDispatch } from 'react-redux';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
function EditMechanicProfile(props) {
  const dispatch=useDispatch()
    console.log("+++++++++",props.data);
    const theme = useTheme();
    const [name, setname] = useState(props.data.name)
    const [mobile, setmobile] = useState(props.data.mobile)
    const [location, setlocation] = useState(props.data.location)
    const [experience, setexperience] = useState(props.data.experience)
    const [minAmount, setminAmount] = useState(props.data.minAmount)
    const [service, setservice] = useState(props.data.service)
    const [serviceResult, setserviceResult] = useState([])
    const [openProfile, setopenProfile] = useState(false)
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setservice(
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    useEffect(() => {
        axios.get('/admin/allservices').then((response)=>{
         console.log(response.data.result);
         if(!response.data.err){
           setserviceResult(response.data.result)
         }
        })
       }, [])
       const handleSubmit=(e)=>{
        e.preventDefault()
        const id=props.data._id;
        axios.patch('/mechanic/updateProfile',{id,name,mobile,location,experience,minAmount,service}).then((response)=>{
          if(!response.data.err){
            handleOpen()
            setTimeout(() => {
              handleClose()
              dispatch({type:'refresh'})
              setopenProfile(true)
            }, 1000);
          }
        })
       }

       const [open, setOpen] = React.useState(false);
       const handleClose = () => {
         setOpen(false);
       };
       const handleOpen = () => {
         setOpen(true);
       };
  return (
    openProfile ? <MechanicaProfile/> :
    <div className="edit-mechanic-bg">
    <div className="edit-mechanic-inner-div">
      <h3 className="edit-mechanic-heading">Edit Form</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        {/* Vehicle Details */}
        <div style={{ display: 'flex' }}>
          <div className="edit-mechanic-form-div1">
            <label>Name:</label>
            <input className="edit-mechanic-input-field" value={name} type="text" onChange={(e)=>setname(e.target.value)} />
            <label>Mobile:</label>
            <input className="edit-mechanic-input-field" value={mobile} onChange={(e)=>setmobile(e.target.value)} type="text"  />
            <label>Location:</label>
            <input className="edit-mechanic-input-field" value={location} onChange={(e)=>setlocation(e.target.value)} type="text"  />
         
          </div>
          <div className="edit-mechanic-form-div2">
          <FormControl sx={{ m: 1, width: 300 }} size="small">
     <InputLabel style={{ fontSize:'14px' ,marginTop:'8px' }}  id="demo-simple-select-helper-label">Select service</InputLabel>  <Select
    labelId="demo-multiple-name-label"
    id="demo-multiple-name"
    multiple
    className="select-input" 
    value={service}
    onChange={handleChange}
    input={<OutlinedInput label="Name" />}
    MenuProps={MenuProps}
  >
    {serviceResult.map((item) => (
      <MenuItem
        key={item._id}
        value={item.serviceName} // Assuming "serviceName" is the desired value to be stored in the state
        style={getStyles(item.serviceName, service, theme)}
      >
        {item.serviceName}
      </MenuItem>
       ))}
       </Select>
       </FormControl>
            <label>Experience:</label>
            <input className="edit-mechanic-input-field" value={experience} onChange={(e)=>setexperience(e.target.value)} type="text"  />
            <label>Minimum amount:</label>
            <input className="edit-mechanic-input-field" value={minAmount} onChange={(e)=>setminAmount(e.target.value)} type="text"  />

          </div>
        </div>

        <button className="edit-mechanic-btn" >
          Submit
        </button>
      </form>

    </div>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  </div>
  )
}

export default EditMechanicProfile
