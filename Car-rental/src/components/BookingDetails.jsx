import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import BookingSummary from './BookingSummary'
import { useDispatch, useSelector } from 'react-redux'
import {  selectUserEmail, selectUserName } from '../redux/authSlice'
import { STORE_BOOKING } from '../redux/bookingSlice'
import { useNavigate } from 'react-router-dom'

const BookingDetails = () => {
  const userEmail=useSelector(selectUserEmail)
  const userName=useSelector(selectUserName)
  const [bookingdetails,setBookingDetails]=useState({name:userName,email:userEmail,mobile:'',aadharcard:'',license:'',address:''})
  const dispatch=useDispatch()
  const navigate=useNavigate()
  let handleBooking=(e)=>{
    e.preventDefault()
    // console.log(bookingdetails)
    dispatch(STORE_BOOKING(bookingdetails))
    navigate('/bookingpayment')
  }
  return (
    <Container className='mt-5 shadow p-2 bg-white'>
        <Row>
            <Col>
                <h1>Booking Details</h1><hr/>
                <Form onSubmit={handleBooking}>
                  <Row>
                    <Col>
                      <Form.Group className='mb-3'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control value={bookingdetails.name}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className='mb-3'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control value={bookingdetails.email}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                
                  <Form.Group className='mb-3'>
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="number" value={bookingdetails.mobile}
                    onChange={(e)=>setBookingDetails({...bookingdetails,mobile:e.target.value})}></Form.Control>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group className='mb-3'>
                      <Form.Label>Aadhar Card No</Form.Label>
                      <Form.Control type="number" value={bookingdetails.aadharcard}
                    onChange={(e)=>setBookingDetails({...bookingdetails,aadharcard:e.target.value})}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className='mb-3'>
                      <Form.Label>license Card No</Form.Label>
                      <Form.Control type="number" value={bookingdetails.license}
                    onChange={(e)=>setBookingDetails({...bookingdetails,license:e.target.value})}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" value={bookingdetails.address}
                    onChange={(e)=>setBookingDetails({...bookingdetails,address:e.target.value})}></Form.Control>
                  </Form.Group>
                    <div className="text-center">
                  <Button type="submit">Proceed</Button>
                  </div>
                </Form>
            </Col>
            <Col>
              <BookingSummary/>
            </Col>
        </Row>
    </Container>
  )
}

export default BookingDetails