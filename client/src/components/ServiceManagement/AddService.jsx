import React, { useState } from 'react'
import { Button } from '@mui/material'
import ServiceManagement from './ServiceManagement'
import axios from '../../axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AddService() {
    const [showServiceMang, setshowServiceMang] = useState(false)
    const [name, setname] = useState('')
    const [file, setfile] = useState('')
    const [err, seterr] = useState('')
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const handleSubmit=(e)=>{
      e.preventDefault()
        if(name.trim()){
        axios.post('/admin/addservice',{name,file},{headers:{
            'content-type': 'multipart/form-data'
        }}).then((response)=>{
            if(!response.data.err){
              setshowServiceMang(!showServiceMang)
            }
        }).catch((err)=>{
            console.log(err);
            dispatch({type:'refresh'})
            navigate('/error')
        })
    }else{
        seterr('All fields are required')
    }
    }
  return (
    !showServiceMang ?
    <div className='admin-bg'>
      <Button  onClick={()=>setshowServiceMang(true)}
       style={{ position: 'absolute', right: '101px', top: '105px' }}
      variant='outlined'>Back</Button>

     <div className="signup">
          <div className="signup-connect"></div>
          <div className="signup-classic">
            <p className="errorMessage">{err}</p>
            <form onSubmit={handleSubmit} className="form">
              <fieldset className="email">
                <input
                  type="text"
                  placeholder="Service name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="username">
              <label style={{ fontSize: '14px' }}>Image</label>
              <input type="file" onChange={(e)=>setfile(e.target.files[0])} accept='image/*' required />
            </fieldset>
              <button type="submit" style={{ color: 'white' }} className="btn">
                submit
              </button>
            </form>
          </div>
        </div>
    </div>

    :<ServiceManagement/>
  )
}

export default AddService
