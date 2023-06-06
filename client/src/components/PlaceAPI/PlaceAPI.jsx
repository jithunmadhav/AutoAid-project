import axios from 'axios'
import React, { useEffect, useState } from 'react'

function PlaceAPI() {
  const [currLocation, setcurrLoca] = useState('')
  useEffect(() => {
 getLoc()
  }, [])
  const getLoc=()=>{
    axios.get('https://ipapi.co/json').then((response)=>{
      console.log(response);
    })
  }
  return (
    <div>
      
    </div>
  )
}

export default PlaceAPI
