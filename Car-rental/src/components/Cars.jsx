import React, { useEffect, useState } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_CARS, selectcars } from '../redux/carSlice'
import CarList from './CarList'
import Loader from './Loader'
import { FILTER_BY_BRAND, FILTER_BY_PRICE, selectFilters, selectbrand, selectprice, selectsearch } from '../redux/filterSlice'
import { Col, Container,Row } from 'react-bootstrap'


const Cars = () => {
  const {data,isLoading} =useFetchCollection('cars')
  const dispatch=useDispatch()
  useEffect(()=>{
        dispatch(STORE_CARS(data))
    },[data])
    const allCars=useSelector(selectcars)
    const filtercars=useSelector(selectFilters)
    const searchvalue=useSelector(selectsearch)

    const {data:brands}=useFetchCollection("brands")
    const [brand,setBrand]=useState('')
    useEffect(()=>{
      dispatch(FILTER_BY_BRAND({allCars,brand}))
    },[brand])

    const brandname=useSelector(selectbrand)

    const [price,setPrice]=useState('')
    useEffect(()=>{
      dispatch(FILTER_BY_PRICE({allCars,price}))
    },[price])

    const pricename=useSelector(selectprice)
  return (
    <Container className='mt-5'>
    {isLoading && <Loader/>}
{/*     
    <h1 className='text-center mt-5'>Our Best Offers</h1><hr/>
      <CarList cars={allCars}/> */}

<Row className='mb-2'>
      <Col xs={{ span: 3 }}>
        <div class="mb-3 row">
          <label for="" class="col-form-label col-4">Brand</label>
          <div className="col-8">
          <select class="form-select" value={brand} onChange={(e)=>setBrand(e.target.value)}>
            <option value='' selected disabled>Select one</option>
            {brands.map((brand,i)=><option key={brand.id}>{brand.name}</option>)}
             </select>
          </div>       
        </div>       
      </Col>
      <Col xs={{ span: 3, offset: 6 }}>
      <div class="mb-3 row">
          <label for="" class="col-form-label col-4">Sort By</label>
          <div className="col-8">
          <select class="form-select" value={price} onChange={(e)=>setPrice(e.target.value)}>
            <option value='' selected disabled>Select one</option>
            <option value='low'>Low to High</option>
            <option value='high'>High to Low</option>
             </select>
          </div>
         
        </div>
      </Col>
    </Row>

      {searchvalue == '' && brandname=='' && pricename=='' ? 
          <CarList cars={allCars}/>  
    :
    <>
      {filtercars.length == 0 ? <Container className='mt-5'><h1>No car found</h1></Container>
        :
        <CarList cars={filtercars}  />  
    }
    </>
  } 
    </Container>
  )
}

export default Cars