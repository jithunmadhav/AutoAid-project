import React, { useState } from 'react'
import { Button } from '@mui/material'
import AddService from './AddService'

function ServiceManagement() {
    const [showAddService, setshowAddService] = useState(false)
  return (
    !showAddService ?
    <div className='admin-bg'>
      <Button onClick={()=>setshowAddService(true)}
       style={{ position: 'absolute', right: '101px', top: '105px' }}
      variant='outlined'>Add services</Button>
    </div>
    :<AddService/>
  )
}

export default ServiceManagement
