import React, { useState } from 'react'
import { Button } from '@mui/material'
import ServiceManagement from './ServiceManagement'

function AddService() {
    const [showServiceMang, setshowServiceMang] = useState(false)
  return (
    !showServiceMang ?
    <div className='admin-bg'>
      <Button  onClick={()=>setshowServiceMang(true)}
       style={{ position: 'absolute', right: '101px', top: '105px' }}
      variant='outlined'>Back</Button>
    </div>
    :<ServiceManagement/>
  )
}

export default AddService
