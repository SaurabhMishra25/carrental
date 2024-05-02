import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm';
import { selectTotalPrice } from '../redux/findCarSlice';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { selectbooking } from '../redux/bookingSlice';
const stripePromise = loadStripe("pk_test_51P8FVQSJbdORr3L1TSc1NqtMe65v6SbVkkyaWiiLM85mkNmgjPEUxzrjlCAWhB7qZQWjx2OYdu3EhkFBrGxr7wLL00dKuwzOel");


const BookingPayment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const amount=useSelector(selectTotalPrice)
    const details=useSelector(selectbooking)
    useEffect(() => {
        fetch("https://server-one-flax.vercel.app/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount:amount,details:details}),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);
    
      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };  
      return (
        <div className="App">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <BookingForm />
            </Elements>
          )}
        </div>
      );
}

export default BookingPayment
