import React,{ useState }from 'react'
import { Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import findCar from '/src/assets/carlogo.png'
import { FaLocationDot, FaMapLocation } from 'react-icons/fa6'
import {locations} from './location.js'
import useFetchCollection from '../customhook/useFetchCollection.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FIND_CARS, TOTAL_DAYS } from '../redux/findCarSlice.js'
const FindCarForm = () => {
  let [details,setDetails]=useState({city:'Ahmedabad',location:'',sdate:'',stime:'',edate:'',etime:''})

  const {data:cars}=useFetchCollection("cars")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  let handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(FIND_CARS({cars,details}))
    dispatch(TOTAL_DAYS({details}))
    navigate('/filtercars')
  }


  return (
    <Container className='col-10 shadow bg-light p-2 rounded' style={{marginTop:'-50px',zIndex:'9'}}>
      <h1 className='text-center text-white bg-dark rounded'>Find Your Best Car Here</h1>
      <Row>
        <Col xs={2}>
            <Image src={findCar} className='img-fluid'></Image>
        </Col>
        <Col xs={10}> 
   <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
        <Form.Label>City</Form.Label>
         <InputGroup className="mb-3">
          <InputGroup.Text><FaLocationDot/></InputGroup.Text>                
            <input type="text" className='form-control' value="Ahmedabad" placeholder="location" />
          </InputGroup>
          <Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Location</Form.Label>
              <select className='form-select' value={details.location} onChange={(e)=>setDetails({...details,location:e.target.value})}>
              <option value='' selected disabled>select location</option>
                {locations.map((loc,i)=><option key={i}>{loc}</option>)}
              </select>
            </Form.Group>
          </Form.Group>
        </Col>
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
                  required value={details.stime}
                  onChange={(e)=>setDetails({...details,stime:e.target.value})}
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
                  required value={details.etime}
                  onChange={(e)=>setDetails({...details,etime:e.target.value})}
                />
              </Form.Group>

        </Col>
      </Row>
      <div class="d-grid gap-2">
                <button className="btn btn-dark" type="submit">Find Car</button>

      </div>
      
          </Form>
        </Col>
      </Row>

    </Container>

  )
}

export default FindCarForm
