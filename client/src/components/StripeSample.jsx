import React from 'react'
import axios from '../axios'
function StripeSample() {
    const submit=()=>{
        axios.post('/user/create-checkout-session').then((response)=>{
            console.log(response);
        })
    }
  return (
    <div>
      <button onClick={submit}>click me</button>
    </div>
  )
}

export default StripeSample
