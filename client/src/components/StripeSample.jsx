import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NHUznSDz600njLaI05KqqnqDZnLkdbltASDz4ZXbIc3ydgMcHy5D787yviVgVubJkJYZiNXDYuA3NgAEZhVXBrm00n1lhApaG');

function StripeSample() {
  const handlePayment = async () => {
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:4000/user/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const { sessionId } = data;
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });
    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Click me</button>
    </div>
  );
}

export default StripeSample;
