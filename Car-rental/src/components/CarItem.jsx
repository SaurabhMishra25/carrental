import React from 'react'
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import cssmodule from './CarItem.module.css'
import { useDispatch } from 'react-redux'
import { ADD_TO_RENT } from '../redux/rentSlice'
const CarItem = ({car}) => {
  const dispatch=useDispatch()
  let handleRent=()=>{
    dispatch(ADD_TO_RENT(car))
    window.scrollTo(0,0)
  }
  return (
    
    <Col xs={4}  className='mb-3'>
         <Card className={cssmodule.card}>
          <Link to={`/car-details/${car.id}`}>
      <Card.Img variant="top" src={car.images[0]} height={220} /></Link>
      <Card.Body>
        <Card.Title className='text-center fs-4'>{car.brand}</Card.Title>
        <Card.Title className='text-center fs-5'>{car.model}</Card.Title>
        <Card.Text>
         <Row>
            <Col>{car.power}</Col>
            <Col>{car.gearbox}</Col>
            <Col>{car.pricewf} /day</Col>
         </Row>
        </Card.Text>
        <div class="d-grid gap-2">
        <ButtonGroup aria-label="Basic example">
            <Button variant="primary" onClick={handleRent}>Rent</Button>
            <Button as={Link} to={`/car-details/${car.id}`} variant="warning">Details</Button>
        </ButtonGroup>
        </div>          
      </Card.Body>
    </Card>
    </Col>
  )
}

export default CarItem