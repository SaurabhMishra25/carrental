import React from 'react'
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {

  const socialLinks = [
    {
      url: "#",
      icon: <FaFacebook/>,
    },
    {
      url: "#",
      icon:<FaInstagram/>,
    },
    {
      url: "#",
      icon: <FaLinkedin/>,
    },
    {
      url: "#",
      icon: <FaTwitter/>,
    },
  ];
  return (
    <>
     <Container className="mt-5 bg-light mb-5 shadow p-5">
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold fs-3 text-dark mb-4">Get In Touch</h6>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Control placeholder="Your Name" type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control placeholder="Email" type="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control as="textarea"
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                  ></Form.Control>
                </Form.Group>

                <button className="btn btn-primary" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
                <h6 className="fw-bold fs-3">Contact Information</h6>
                <p className="mb-0">
                xxx-xxxx-xxxx
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className=" mb-0">+0987654321</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className=" mb-0">xxx@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index} className='text-dark fs-4'
                      >
                      {item.icon}
                    </Link>
                  ))}
                </div>
            </Col>
          </Row>
        </Container>
    </>
  )
}

export default Contact