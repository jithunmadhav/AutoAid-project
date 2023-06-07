import React from 'react'
import Navbar from '../components/NavBar/Navbar'
import PlaceAPI from '../components/PlaceAPI/PlaceAPI'

function PlacePage(props) {
  return (
    <div>
      <Navbar/>
      <PlaceAPI data={{...props.data}}/>
    </div>
  )
}

export default PlacePage
