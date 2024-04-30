import React, { useEffect,useState } from 'react'
import { FaCarSide } from 'react-icons/fa'
import { TbEngine, TbManualGearbox } from 'react-icons/tb'
import { PiEngineFill } from 'react-icons/pi'
import { BsCarFront, BsFillFuelPumpFill } from 'react-icons/bs'
import { useDispatch,useSelector } from 'react-redux'
import { SAVE_URL, selectAddToRent,selectURL } from '../redux/rentSlice'
import { Col, Container, Row ,Button, ListGroup,Image, Form} from 'react-bootstrap'
import { selectIsLoggedIn } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { STORE_DETAILS, TOTAL_DAYS, TOTAL_PRICE, fetchDetails, selectTotalDays, selectTotalPrice } from '../redux/findCarSlice'

const Rent = () => {
  let [details,setDetails]=useState({city:'Ahmedabad',location:'',sdate:'',stime:'',edate:'',etime:'',fuel:'wf'})
  const[isWF,setIsWF]=useState(true)

  const cardetails=useSelector(fetchDetails)
  const days=useSelector(selectTotalDays)

  const carrent=useSelector(selectAddToRent)
  const url=window.location.href
  const isLoggedIn=useSelector(selectIsLoggedIn)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  let handleBooking=(e)=>{
    e.preventDefault()
    dispatch(STORE_DETAILS(details))

    if(isLoggedIn){
      navigate('/booking')}
      else{
      dispatch(SAVE_URL(url))
      navigate('/login')}
  }
  useEffect(()=>{
    if(Object.keys(cardetails).length !=0){
        setDetails({...cardetails})
    }
  },[cardetails])

  useEffect(()=>{
    dispatch(TOTAL_DAYS({details}))
  },[details.sdate,details.edate])

useEffect(()=>{
 if(isWF){
  dispatch(TOTAL_PRICE(days*carrent.pricewf))
  
 }
 else {
  dispatch(TOTAL_PRICE(days*carrent.pricewof))
 }
},[isWF])
const price=useSelector(selectTotalPrice)
  return (
    <Container className='bg-light mt-5 shadow  p-3'>
      <Form>
      <h1 className='text-center'>Book Your Car</h1><hr/>
        <Row>
            <Col xs={6}>
                <Image src={carrent.images[0]} className='img-fluid'/>

                <Row className='mt-3'>
                <Form.Label>Choose Location</Form.Label>
                <Form.Select value={details.location} onChange={(e)=>setDetails({...details,location:e.target.value})} required> 
                  <option value='' selected disabled>select location</option>
                  {carrent.locations.map((loc,i)=><option key={i}>{loc}</option>)}
                </Form.Select>
                <Col>
        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
                <input type="date"  min={new Date().toISOString().split('T')[0]} className='form-control' placeholder="start date" required 
                value={details.sdate}
                onChange={(e)=>setDetails({...details,sdate:e.target.value})}/>
              </Form.Group>
             
              <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
                <input
                  className="form-control"
                  type="time"
                  placeholder="start time"
                  value={details.stime}
                  onChange={(e)=>setDetails({...details,stime:e.target.value})}
                  required
                />
              </Form.Group>
        </Col>

        <Col>
        <Form.Group className="mb-3">
        <Form.Label>End Date</Form.Label>
                <input type="date"  min={new Date().toISOString().split('T')[0]} className='form-control' placeholder="end date" required 
                value={details.edate}
                onChange={(e)=>setDetails({...details,edate:e.target.value})}/>
              </Form.Group>

              <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
                <input
                  className="form-control"
                  type="time"
                  placeholder="start time"
                  required
                  value={details.etime}
                  onChange={(e)=>setDetails({...details,etime:e.target.value})}
                />
              </Form.Group>

        </Col>
                </Row>
            </Col>
            <Col xs={6}>
   <ListGroup variant="flush">
    <ListGroup.Item action>
      <FaCarSide size="2em" className="me-2" style={{marginTop: "-10px"}}/>
    <span className="fs-6">Brand & Model:</span> &nbsp;
       <span className="fs-5 fw-bold">{`${carrent.brand} / ${carrent.model}`}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item action>
                                            <TbEngine size="2em" className="me-2" style={{marginTop: "-8px"}}/>
                                            <span className="fs-6">HP:</span> &nbsp;
                                            <span className="fs-5 fw-bold">{carrent.power}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item action>
                                            <TbManualGearbox size="2em" className="me-2" style={{marginTop: "-8px"}}/>
                                            <span className="fs-6">Gear Box:</span> &nbsp;
                                            <span className="fs-5 fw-bold">{carrent.gearbox}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item action>
                                            <BsCarFront size="2em" className="me-2" style={{marginTop: "-10px"}}/>
                                            <span className="fs-6">Body Type:</span> &nbsp;
                                            <span className="fs-5 fw-bold">{carrent.segment}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item action>
                                            <BsFillFuelPumpFill size="2em" className="me-2" style={{marginTop: "-10px"}}/>
                                            <span className="fs-6">Fuel Type:</span> &nbsp;
                                            <span className="fs-5 fw-bold">{carrent.fuel}</span>
                                        </ListGroup.Item> 
    </ListGroup>
  
      <Row className='mt-3'>
        <Col>
        <input type="radio" name='fuel' onClick={(e)=>{setDetails({...details,fuel:'wf'});setIsWF(true)}}></input>
          <label className="form-label ms-2 me-5">With Fuel:</label>
          <label className="text-dark fw-bold">Price: {carrent.pricewf}/day </label>
        </Col>
        </Row><Row>
        <Col>
        <input type="radio" name='fuel'  onClick={(e)=>{setDetails({...details,fuel:'wof'});setIsWF(false)}}></input>
        <label className="form-label ms-2 me-4">Without Fuel:</label>
        <label className="text-dark fw-bold">Price: {carrent.pricewof}/day </label>
        </Col>
      </Row>
      <Row>
      <h2 className="bg-warning text-white">Total Days:- {days} & Total Price :{price} 
      </h2>
      </Row>
      </Col>
        </Row>
        <div class="d-grid gap-2">
          <button
            type="submit"
            name=""
            id=""
            class="btn btn-primary" onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
        </Form>
   </Container>
  )
}

export default Rent