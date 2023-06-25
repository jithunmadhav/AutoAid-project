import React, { useState } from 'react'
import './BookingStatus.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBProgress,
    MDBProgressBar,
    MDBRow,
  } from "mdb-react-ui-kit";
function BookingStatus(props) {
 console.log(props.data);
    const [status, setStatus] = useState("Confirmed");
  
    const handleStatusChange = (newStatus) => {
      setStatus(newStatus);
    };
  
    const calculateProgressWidth = () => {
      if (status === "Waiting for Confirmation") {
        return 0;
      } else if (status === "Confirmed") {
        return 33;
      } else if (status === "Progress") {
        return 66;
      } else if (status === "Completed") {
        return 100;
      }
    };
  return (
    <div className='bookingstatus-bg'>
          <MDBContainer className="py-5">
      <MDBRow className="justify-content-center">
        <MDBCol lg="10">
           
           
              <MDBRow style={{ marginTop:'290px' }} className="align-items-center">
                 
                <MDBCol md="10">
                  <MDBProgress style={{ height: "6px", borderRadius: "16px" }}>
                    <MDBProgressBar
                      style={{ borderRadius: "16px", backgroundColor: "blue" }}
                      width={calculateProgressWidth()}
                      valuemin={0}
                      valuemax={100}
                    />
                  </MDBProgress>
                  <div className="d-flex justify-content-around mb-1">
                  <p className="text-muted mt-1 mb-0 small">pending</p>
                  <p className="text-muted mt-1 mb-0 small">confirm </p>
                    <p className="text-muted mt-1 mb-0 small">Work Progress</p>
                    <p className="text-muted mt-1 mb-0 small">Completed</p>
                  </div>
                </MDBCol>
              </MDBRow>
         {/* <br/>
        
          <div className="d-flex justify-content-around">
              <button
                className={`status-button ${
                  status === "Waiting for Confirmation" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("Waiting for Confirmation")}
              >
                Waiting for Confirmation
              </button>
              <button
                className={`status-button ${
                  status === "Confirmed" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("Confirmed")}
              >
                Confirmed
              </button>
              <button
                className={`status-button ${
                  status === "Progress" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("Progress")}
              >
                Progress
              </button>
              <button
                className={`status-button ${
                  status === "Completed" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("Completed")}
              >
                Completed
              </button>
            </div> */}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  )
}

export default BookingStatus
