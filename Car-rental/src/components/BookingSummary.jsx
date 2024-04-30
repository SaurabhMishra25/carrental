import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { fetchDetails, selectTotalDays, selectTotalPrice } from '../redux/findCarSlice'
import { selectAddToRent } from '../redux/rentSlice'

const BookingSummary = () => {
  const details=useSelector(fetchDetails)
  const days=useSelector(selectTotalDays)
  const tprice=useSelector(selectTotalPrice)
  const carrent=useSelector(selectAddToRent)
  return (
   <>
    <h1>Booking Summary</h1><hr/>
    <Card >
      <Card.Header>
          Brand:{carrent.brand} &emsp; Model:{carrent.model}
      </Card.Header>
      <Card.Body>
        <h5>Details: </h5>
        Location:{details.location}<br/>
        Start Date and Time :{details.sdate} at {details.stime}<br/>
        End Date and Time: {details.edate} at {details.etime}<br/>
        Fuel:{details.fuel}<br/>
        Price/day: {details.fuel =='wf'? carrent.pricewf :carrent.pricewof}<br/>
        Total Days: {days}<br/>
        Total Price:{tprice}<br/>
        
      </Card.Body>
    </Card>
   </>
  )
}

export default BookingSummary