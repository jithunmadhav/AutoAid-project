import React, { useState } from 'react';
import axios from '../../axios';

const RefundForm = () => {
  const [paymentId, setPaymentId] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [refundStatus, setRefundStatus] = useState('');

  const handleRefund = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/refund', { paymentId, refundAmount });
      console.log(response.data);
      if (response.data.success) {
        setRefundStatus('Refund successful');
      } else {
        setRefundStatus('Refund failed');
      }
    } catch (error) {
      setRefundStatus('Refund failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleRefund}>
        <input
          type="text"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
          placeholder="Payment ID"
        />
        <input
          type="text"
          value={refundAmount}
          onChange={(e) => setRefundAmount(e.target.value)}
          placeholder="Refund Amount"
        />
        <button type="submit">Refund</button>
      </form>
      <p>{refundStatus}</p>
    </div>
  );
};

export default RefundForm;