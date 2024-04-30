import React, { useEffect, useState } from 'react'
import BookingSummary from './BookingSummary'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Col, Container, Row } from 'react-bootstrap';
import { EMPTY_CART, selectAddToRent } from '../redux/rentSlice';
import { fetchDetails, selectTotalDays, selectTotalPrice } from '../redux/findCarSlice';
import { selectbooking } from '../redux/bookingSlice';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { selectUserEmail, selectUserId } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

const BookingForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (!stripe) { return; }
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret" );
      if (!clientSecret) {  return; }
    }, [stripe]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {return}
      setIsLoading(true);
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000",
        },redirect:"if_required"
      }).then((result)=>{
          if(result.error){
              toast.error(result.error.message);setMessage(result.error.message)
              return
          }
          if(result.paymentIntent){
              if(result.paymentIntent.status=='succeeded'){
                  toast.success("payment done")
                  setIsLoading(false) 
                  bookcar()          
              }
          }
      })
        setIsLoading(false);
    };
  
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const rented=useSelector(selectAddToRent)
    const details=useSelector(fetchDetails)
    const bookingdetails=useSelector(selectbooking)
    const userId=useSelector(selectUserId)
    const userEmail=useSelector(selectUserEmail)
    const totaldays=useSelector(selectTotalDays)
    const totalPrice=useSelector(selectTotalPrice)
      let bookcar=async()=>{  
          let today=new Date()
          let bookingDate=today.toLocaleDateString()
          let bookingTime=today.toLocaleTimeString()
          let config={userId,userEmail,car:rented,amount:totalPrice,bookingAddress:bookingdetails, bookingDate,bookingTime, bookingStatus:"processing",
          details,days:totaldays,createdAt:Timestamp.now().toMillis()}
          try{
              const docRef=collection(db,"bookings")
              await addDoc(docRef,config)
              toast.success("booking done")
              dispatch(EMPTY_CART())
              navigate('/')
          }
          catch(error){
            toast.error(error.message)
          }
    //       try{
    //           const docRef=collection(db,"orders")
    //           await addDoc(docRef,orderConfig)
  
    //           emailjs.send('service_a8dsm3m', 'template_wwrc5ya', 
    //           {user_email:userEmail,order_status:orderConfig.orderStatus,amount:totalAmount}, {
    //             publicKey: 'ouyyULNr1Fl9QYxiJ',
    //           })
    //           .then( () => {
    //             toast.success("order placed")
    //             dispatch(EMPTy_CART())
    //             navigate('/')
    //             },(error) => { toast.error(error.text)  },
    //           );         
    //       }
    //       catch(error){
    //           toast.error(error.message)
    //       }
      }
  
    const paymentElementOptions = {
      layout: "tabs"
    }
  return (
    <Container className="mt-5  shadow bg-light p-3">
    <Row>
        <Col><BookingSummary/></Col>
        <Col>
            <h1>Stripe Payment Checkout</h1> <hr/>
            <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <div class="d-grid gap-2 mt-3">
            <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary">
            <span id="button-text">
                {isLoading ? <div class="d-flex justify-content-center">
                            <div class="spinner-border text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            </div> : "Pay now"}
            </span>
            </button>
            </div>
            {message && <div id="payment-message">{message}</div>}
            </form>
        </Col>
    </Row>
</Container>

  )
}

export default BookingForm