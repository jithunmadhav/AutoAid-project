
import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import './ComplaintForm.css';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Slide } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
 import {
  CProgress,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const stripePromise = loadStripe('pk_test_51NHUznSDz600njLaI05KqqnqDZnLkdbltASDz4ZXbIc3ydgMcHy5D787yviVgVubJkJYZiNXDYuA3NgAEZhVXBrm00n1lhApaG');

function ComplaintForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state);
  const [open, setOpen] = React.useState(false);
  
  const [complaint, setComplaint] = useState('');
  const vehicleId = props.data.selectedVehicle;
  const userId = user.details._id;
  const username=user.details.name;
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

 
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('Initial content');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    setModalContent('New content');
  };

  const handleStripe = async () => {
      const stripe = await stripePromise;
        const minAmount = props.data.mechanic.minAmount;
      const response = await axios.post('/user/stripepayment', {
        minAmount: minAmount,
        ...props.data,
        location,
        complaint,
        userId,username
      });
      const { sessionId, metadata } = response.data;

      stripe.redirectToCheckout({
        sessionId: sessionId,
      });
  };

  const handleRazorpay = () => {
    createOrder()
  };
  useEffect(() => {
    axios.get('/user/vehicleDetails', { params: { vehicleId, userId } })
      .then((response) => {
        if (!response.data.err) {
          setVehicleDetails(response.data.result.vehicle[0]);
        }
        navigator.geolocation.getCurrentPosition((position) => {
          const accessToken = 'pk.eyJ1Ijoiaml0aHVuIiwiYSI6ImNsaWEzZjg1NzBuMngzZHBnOWZzeTJ3eDMifQ.QUWNrEcjjYw_-HbBUDquhw';
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`)
            .then(response => response.json())
            .then(data => {
              const placeName = data.features[0].text;
              setLocation(placeName);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        });
      })
      .catch(err => console.log(err));

    Axios.get('https://ipapi.co/json')
      .then((response) => {
        console.log(response);
      });
  }, [userId, vehicleId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpenModal()
  };

  const emergencyschedule = async () => {
  
    if (props.data.mechanic.booking === 'Scheduled booking') {
      handleConfirm();
    } else {
      setLoading(true);
      axios.post('/user/appointment', { ...props.data, location, complaint, userId,username }).then((response) => {
        handleCloseModal()
        setOpen(true);
        dispatch({ type: 'refresh' });
        setTimeout(() => {
          setLoading(false);
          navigate('/success');
        }, 3000);
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [orderId, setOrderId] = useState('');
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = handleRazorpayScriptLoad;
    document.body.appendChild(script);
  };

  const handleRazorpayScriptLoad = () => {
    // Razorpay script has been loaded
    // You can initialize the payment here or wait for user interaction
  };

  const createOrder = async () => {
    try {
      const response = await axios.post('/user/createOrder',{...props.data});
      const { orderId } = response.data;
      setOrderId(orderId);
      setPaymentError('');
      initiateRazorpayPayment(orderId);
    } catch (error) {
      setOrderId('');
      setPaymentError('Failed to create order');
      console.error(error);
    }
  };

  const initiateRazorpayPayment = (orderId) => {
    const options = {
      key: 'rzp_test_CbGFfMm3j0aAgq',
      amount: props.data.mechanic.minAmount*100, // Amount in paise (e.g., 50000 for ₹500)
      currency: 'INR',
      name: 'AUTO AID', // Your business name
      description: 'Online Transaction',
      image: 'https://i.ibb.co/zSMfgvM/Logo.png',
      order_id: orderId.id,
      handler: async (response) => {
        try {
          await verifyPayment(response, orderId);
        } catch (error) {
          console.error(error);
          setPaymentError('Payment verification failed');
        }
      },
      prefill: {
        name: 'John Doe', // Customer's name
        email: 'john@example.com', // Customer's email
        contact: '9876543210', // Customer's contact number
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error('Razorpay script is not loaded');
    }
  };

  const verifyPayment = async (payment, orderId) => {
    try {
    
      const response = await axios.post('/user/verifyPayment', {payment,orderId, ...props.data, location, complaint, userId,username });
      console.log(response);
      if (!response.data.err) {
        navigate('/success')
      } else {
        // Payment failed
        console.log('Payment failed');
      }
    } catch (error) {
      console.error(error);
      setPaymentError('Payment verification failed');
    }
  };
  return (
    <div className="complaint-bg">
      <div className="complaint-inner-div">
        <h3 className="Complaint-heading">Complaint Form</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
          {/* Vehicle Details */}
          <div className='outer-form'>
            <div className="form-div1">
              <label>Manufacture:</label>
              <input className="input-field" value={vehicleDetails?.manufacture || ''} type="text" readOnly />
              <label>Reg No:</label>
              <input className="input-field" value={vehicleDetails?.regNo || ''} type="text" readOnly />
              <label>Fuel:</label>
              <input className="input-field" value={vehicleDetails?.fuel || ''} type="text" readOnly />
              <label>Location:</label>
              <textarea style={{ height: '96px' }} className="input-field" value={location} type="text" readOnly />
            </div>
            <div className="form-div2">
              <label>Vehicle Name:</label>
              <input className="input-field" value={vehicleDetails?.vehicleName || ''} type="text" readOnly />
              <label>Kilometer:</label>
              <input className="input-field" value={vehicleDetails?.kilometer ? `${vehicleDetails.kilometer} KM` : ''} type="text" readOnly />
              <label>Manufacture Year:</label>
              <input className="input-field" value={vehicleDetails?.manufactureYear || ''} type="text" readOnly />
              <label>Complaint Description:</label>
              <textarea style={{ height: '96px' }} value={complaint} onChange={(e) => setComplaint(e.target.value)} className="input-field" type="text" placeholder="Eg: 5000KM oil change" required />
            </div>
          </div>

          <button className="complaint-btn" disabled={loading}>
            Submit
          </button>

          {loading && (
            <div style={{ marginTop: '10px' }}>
              <CProgress animated color="success" value={100} />
            </div>
          )}
        </form>

     
 <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
        {modalContent === 'Initial content' && (
          <Modal.Title >Confirmation</Modal.Title>)}
           {modalContent === 'New content' &&(
          <Modal.Title >Payment mode</Modal.Title>)}
        </Modal.Header>
        <Modal.Body style={{ flexDirection:'column'  }} className="d-flex  align-items-center">
          {modalContent === 'Initial content' && (
            <>
            <div>
           <p style={{ textAlign:'left' }}>Technician Info &emsp; : {props.data.mechanic.name}</p>
            <p>Vehicle &emsp; &emsp; &emsp; &emsp;: {vehicleDetails.vehicleName} - {vehicleDetails.manufacture}</p>
            <p>Service Info&emsp;&nbsp; &emsp;: {props.data.mechanic.selectedService}</p>
            <p>Booking Type&nbsp; &emsp;: {props.data.mechanic.booking}</p>
            </div>
            <div style={{ display:'flex',justifyContent:'space-evenly' ,width:'100%' ,marginTop:'10px' }}>
              <Button variant="outlined" color="error" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="outlined" color="success" onClick={emergencyschedule}>
                Confirm
              </Button>
              </div>
            </>
          )}

          {modalContent === 'New content' && (
            <>
              
            <div style={{ display:'flex',justifyContent:'space-evenly',width:'100%',margin:'20px' }}>
              <Button variant="outlined" onClick={handleStripe}>
               <img style={{ objectFit:'contain' ,width:'106px',height:'50px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png" alt="" />
              </Button>
              <Button variant="outlined" onClick={handleRazorpay}>
                <img style={{ objectFit:'contain' ,width:'106px',height:'50px' }} src="data:image/png;base64,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" alt="" />
              </Button></div>
            </>
          )}
        </Modal.Body>
      </Modal>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="success">
            Appointment booked successfully!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
          }

export default ComplaintForm;
