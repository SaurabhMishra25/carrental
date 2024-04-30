import React ,{ useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CarItem from './CarItem'
import ReactPaginate from 'react-paginate'

const CarList = ({cars}) => {
  const itemsPerPage=3
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems,setCurrentItems]=useState([])
  const [pageCount,setPageCount]=useState(0)

  useEffect(()=>{
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(cars.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(cars.length / itemsPerPage))
  },[itemOffset,cars])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cars.length;
      setItemOffset(newOffset); 
  };

  return (
    <Container>
        {cars.length==0 && <h1>No Car Found</h1>}
        <Row>
            {currentItems.map((car,i)=><CarItem key={car.id} car={car}/>)}
        </Row>

        <Row>
          <Col xs={{span:'4',offset:'5'}}>
          <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeLinkClassName="page-item active"
        pageLinkClassName="page-link"
        pageClassName="page-item"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
      />
      </Col>
        </Row>
    </Container>
  )
}

export default CarList
