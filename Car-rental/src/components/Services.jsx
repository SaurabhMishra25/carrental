import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaBroadcastTower, FaCarAlt, FaCarSide, FaCheckCircle, FaCheckDouble, FaGifts, FaThumbsUp, FaTicketAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const Services = () => {
    const serviceData = [
        {
          id: 1,
          title: "Accessible",
          icon:<FaCarAlt/>,
          desc: "There’s always near you",
        },
      
        {
          id: 2,
          title: "Secure",
         icon:<FaCheckDouble/>,
          desc: "Pay 0 security deposit, get unlimited KMs",
        },

        {
          id: 3,
          title: "Flexible pricing plans",
          icon: <FaTicketAlt/>,
          desc: "Choose 'Unlimited kms' or 'with fuel' plans",
        },
      
        {
          id: 4,
          title: "Convenient",
          icon:<FaThumbsUp/>,
          desc: "From Hatchbacks to SUVs, choose from our cars",
        },
      
        {
          id: 5,
          title: "Home delivery & return",
          icon: <FaLocationDot/>,
          desc: "On-time doorstep service,at your preferred location and time",
        },
      
        {
          id: 6,
          title: "Well maintained cars",
          icon: <FaCarSide/>,
          desc: "Regular service & maintenance; inspected before each trip",
        },  
      ];
          
  return (
    <Container className='mt-5'>
        <h1 className='text-center'>Our Services</h1>
        <hr/>
       <Row>
      {serviceData.map((item) => (
       <Col lg="4" md="4" sm="6" className="mb-3">
        <Card>
            <Card.Body>
               <span className='mb-5 text-warning fs-2 p-1'>{item.icon}</span>
                <h5 className='fw-bold'>{item.title}</h5>
                <p>{item.desc}</p>
            </Card.Body>
        </Card>
     </Col>
      ))}
    </Row>
    </Container>
  )
}

export default Services