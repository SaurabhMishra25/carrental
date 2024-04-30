import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const LoadModal = ({close}) => {
   return ReactDom.createPortal(
        <Modal 
        show fade
        onHide={()=>close()}
        backdrop="static"
        keyboard={false}
        size=""
        centered>

        <Modal.Body>
          <h2> Login 
        <span variant="secondary" className='float-end fs-4' 
        style={{cursor:'pointer'}} onClick={()=>close()}>
            X
          </span></h2><br/>
          <div>
                I will not close if you click outside me. Do not even try to press
                escape key.
          </div>
            <br/>
          <Button variant="secondary" className='float-end me-2' onClick={()=>close()}>
            Close
          </Button>
          <Button variant="primary" className='float-end me-2'>Understood</Button>
        
        </Modal.Body>
      </Modal>
    , document.getElementById('modal')
)}

export default LoadModal