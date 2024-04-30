import React from 'react'
import useFetchCollection from '../../customhook/useFetchCollection'
import { Table } from 'react-bootstrap'
import { db } from '../../firebase/config'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser';

const Rentals = () => {
    const {data:bookings}=useFetchCollection("bookings")
    let handleChange=async(val,book)=>{
      if(val !=''){
        try{
          const docRef=doc(db,"bookings",book.id)
          await setDoc(docRef,{...book,bookingStatus:val,editedAt:Timestamp.now().toMillis()})
          toast.success(`status updated for ${book.id}`)
          emailjs.send('service_rn5amdd', 'template_al7ujvq',{ status:val,email:book.userEmail,
            sdate:book.details.sdate,edate:book.details.edate,price:book.amount,days:book.days},{
        publicKey: 'eZ_YnIpnpejwNWE4N',
      })
        .then(() => {
              toast.success(`mail sent successfully`)
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
                
        }
        catch(error){
            toast.error(error.message)
        }
      }
     
    }
  return (
    <>
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
          <th>Action</th>
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
            
            <div class="mb-3">
                <select defaultValue={book.bookingStatus} 
                onChange={(e)=>handleChange(e.target.value,book)} >
                    <option value=''>Select one</option>
                    <option>Confirm</option>
                    <option>Cancelled</option>
                    <option value='Done'>Ride Done</option>
                </select>
            </div>
            
          </td>
        </tr>
        )}
            </tbody>
    </Table>
    </>
  )
}

export default Rentals
