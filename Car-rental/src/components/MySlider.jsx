
import React, { useRef } from 'react'
import { Button, Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { FaCircleArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import './MySlider.css'
import Car1 from '/src/assets/car1.jpg'
import Car2 from '/src/assets/car2.jpg'
import Car3 from '/src/assets/car5.jpg'

const MySlider = () => {
  const allSliders=[
    {id:'1',url:Car1},
    {id:'2',url:Car2},
    {id:'3',url:Car3}
  ]

  return (
   <>
   
<Carousel fade indicators={false} >
  {allSliders.map((slider,i)=>
      
      <Carousel.Item key={slider.id} interval={1500}>
        <Image src={slider.url} className='w-100' height='600'/>
        <Carousel.Caption>
          <h3>{slider.title}</h3>
          <p>{slider.desc}</p>
          {/* <Link className='btn btn-light text-dark btn-lg' to='/cars'>Rent Now</Link> */}
        </Carousel.Caption>
      </Carousel.Item>

)}
   </Carousel>
   </>
  )
}

export default MySlider
