import React, { useState, useEffect } from 'react';
import axios from '../axios';

function RazorpayPaymentPage() {
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
      const response = await axios.post('/user/createOrder');
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
      amount: 50000, // Amount in paise (e.g., 50000 for ₹500)
      currency: 'INR',
      name: 'GadgetZon', // Your business name
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
    
      const response = await axios.post('/user/verifyPayment', {payment,orderId});
      console.log(response);
      if (response.data.success) {
        // Payment successful
        console.log('Payment successful');
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
    <div>
      {paymentError && <p>{paymentError}</p>}
      {!orderId && <button onClick={createOrder}>Make Payment</button>}
    </div>
  );
}

export default RazorpayPaymentPage;



