import React from 'react'
import {Container, Row, Col} from "react-bootstrap"
import AboutImage from '/src/assets/aboutimg.png'
const About = () => {
  return (
    <Container fluid className='bg-light mt-5 shadow p-3'>
    <Row className="mt-1 mb-2">
      <Col xs={{span:12, order:"last"}} md={{span:6, order:"first"}}>
        <div className="image_iman">
            <img src={AboutImage} className="img-fluid" />
        </div>
      </Col>
      <Col xs={{span:12, order:"first"}} md={{span:6, order:"last"}}>
        <div className="mt-2 mb-5">
          <h1 className="fs-1 fw-600">
              About <span className="primary-color">Us</span>
          </h1>
          <p className="about-text fs-5 m-0">
              Welcome to the hassle-free world of self-drive cars in Ahmedabad! 
              Picture this: the freedom to explore the Manchester of India at 
              your own pace, without depending on anyone else. 
              With a hired vehicle, you're not just renting a car; 
              you're unlocking a world of convenience and flexibility.
            <br/>
          <b>Benefits Of Car Rentals In Ahmedabad</b><br/>
            Why bother with the hassles of ownership when you can experience the perks
            of driving without the commitments? Car rentals in Ahmedabad offer you the 
            luxury of having a vehicle at your disposal without the worries of maintenance,
            insurance, or hefty down payments. It's about simplicity, freedom, and making 
            your journey truly yours.
          </p>
          {/* <div className="mt-3">
              <a href="#" className="readmore-btn fs-5 px-3 py-2">Read More</a>
          </div> */}
        </div>
      </Col>
    </Row>
 </Container>
  )
}

export default About