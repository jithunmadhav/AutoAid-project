import React, { useState } from 'react'
import AddVehiclePage from '../../Pages/AddVehiclePage'

function AddVehicleForm() {
    const [closeform, setcloseform] = useState(false)
    const closeForm=()=>{
        setcloseform(true)
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
  {/* <p className='errorMessage'>{err}</p> */}
    <form className='Form' >
      <fieldset className='username'>
        <input type="text" placeholder="username"  required/>
      </fieldset>
      <fieldset className='email'>
        <input type="email" placeholder="email" required/>
      </fieldset>
      <fieldset className='password'>
        <input type="text" placeholder="Mobile"   required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="password"  required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="confirm password"    required/>
      </fieldset>
      <button type="submit" style={{ color:'white' }}  className="btn">sign up</button>
      
    </form>

  </div>
</div>
             </div>
      </div>
    </div>
  )
}

export default AddVehicleForm
