import React, { useEffect, useState } from 'react'
import UserBookingHistory from '../UserBookingHistory/UserBookingHistory'
import './BookingStatus.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
function BookingStatus(props) {
  const [status, setStatus] = useState(null); // Initial status is 0, indicating the first step
const [closeStatus, setcloseStatus] = useState(false)
  useEffect(() => {
  if (props.data.status === 'waiting for comfirmation') {
    setStatus(0);
  } else if (props.data.status === 'confirmed') {
    setStatus(1);
  } else if (props.data.status === 'work progressing') {
    setStatus(2);
  } else if (props.data.status === 'completed') {
    setStatus(3);
  }
}, []); // Empty dependency array to run the effect only once


 return (
  closeStatus ? <UserBookingHistory/> :
   <>
     <section className="vh-100 bookingstatus-bg" >
     <button onClick={()=>setcloseStatus(true)}  className='bookingstatus-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </button>
       <MDBContainer className="py-5 h-100">
         <MDBRow className="justify-content-center align-items-center h-100">
           <MDBCol size="12">
             <MDBCard
               className="card-stepper text-black"
               style={{ borderRadius: "16px" }}
             >
               <MDBCardBody className="p-5">
                 <div className="d-flex justify-content-between align-items-center mb-5">
                   <div>
                     <MDBTypography tag="h5" className="mb-0">
                       Technician Info :{" "}
                       <span className="text-primary font-weight-bold">
                         {props.data.mechanic_name}
                       </span>
                     </MDBTypography>
                   </div>
                   <div className="text-end">
                     <p className="mb-0">
                    Technician Mobile :<span>{props.data.mechanic_mobile}</span>                     </p>
                     <p className="mb-0">
                       call and confirm for speedy service
                     </p>
                   </div>
                 </div>
                 <ul
                   id="progressbar-2"
                   className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                 >
                   <li
                     className={`step0 ${
                       status >= 0 ? "active" : ""
                     } text-center`}
                     id="step1"
                   ></li>
                   <li
                     className={`step0 ${
                       status >= 1 ? "active" : ""
                     } text-center`}
                     id="step2"
                   ></li>
                   <li
                     className={`step0 ${
                       status >= 2 ? "active" : ""
                     } text-center`}
                     id="step3"
                   ></li>
                   <li
                     className={`step0 ${
                       status >= 3 ? "active" : ""
                     } text-center`}
                     id="step4"
                   ></li>
                 </ul>

                 <div className="d-flex justify-content-between">
                   <div className="d-lg-flex align-items-center">
                     <MDBIcon
                       fas
                       icon="clipboard-list me-lg-4 mb-3 mb-lg-0"
                       size="3x"
                     />
                     <div>
                       <p className="fw-bold mb-1">Waiting for</p>
                       <p className="fw-bold mb-0">confirmation</p>
                     </div>
                   </div>
                   <div className="d-lg-flex align-items-center">
                     <MDBIcon
                       fas
                       icon="box-open me-lg-4 mb-3 mb-lg-0"
                       size="3x"
                     />
                     <div>
                       <p className="fw-bold mb-1">confirmed</p>
                     </div>
                   </div>
                   <div className="d-lg-flex align-items-center">
                     <MDBIcon
                       fas
                       icon="shipping-fast me-lg-4 mb-3 mb-lg-0"
                       size="3x"
                     />
                     <div>
                       <p className="fw-bold mb-1">work in</p>
                       <p className="fw-bold mb-0">progress</p>
                     </div>
                   </div>
                   <div className="d-lg-flex align-items-center">
                     
                     <div>
                       <p className="fw-bold mb-1">Completed</p>
                     </div>
                   </div>
                 </div>
               </MDBCardBody>
             </MDBCard>
           </MDBCol>
         </MDBRow>
       </MDBContainer>
     </section>
   </>
 );
}

export default BookingStatus
