import React from 'react'
import { Container, Table } from 'react-bootstrap'
import useFetchCollection from '../customhook/useFetchCollection'
import { useSelector } from 'react-redux'
import { selectUserId } from '../redux/authSlice'

const MyBookings = () => {
    const {data}=useFetchCollection("bookings")
    const userId=useSelector(selectUserId)
    const bookings=data.filter(item=>item.userId==userId)
  return (
    <Container className='mt-5 p-2'>
        <h1>My Bookings</h1>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>bookingID</th>
        <th>UserEmail</th>
        <th>Location</th>
        <th>Car Brand and Model</th>
        <th>Total Days</th>
        <th>Total Price</th>
        <th>Start Date and Time</th>
        <th>End Date and Time</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
      {bookings.length==0 &&   <tr><td colSpan={9}>No Booking Found</td></tr>}
      {bookings.map((book,i)=>
      <tr>
        <td>{book.id}</td>
        <td>{book.userEmail}</td>
        <td>{book.details.location}</td>
        <td> {book.car.model}({book.car.brand})</td>
        <td>{book.days}</td>
        <td>{book.amount}</td>
        <td>{book.details.sdate} at {book.stime}</td>
        <td>{book.details.edate} at {book.etime}</td>
        <td>
        {book.bookingStatus}
              
        </td>
      </tr>
      )}
          </tbody>
      </Table>
    </Container>
  
  )
}

export default MyBookings