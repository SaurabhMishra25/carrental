import React, { useEffect ,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '/src/assets/logo.jpg'
import { Button, Form, Image, InputGroup } from 'react-bootstrap';
import { FaArrowAltCircleLeft, FaListAlt, FaLock, FaPenNib,  FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser, logoutuser, selectUserName,selectUserRole } from '../redux/authSlice';
import { doc, getDoc } from 'firebase/firestore';
import './Header.css'
import { ShowOnLogIn, ShowOnLogout } from './hiddenlinks';
import useFetchCollection from '../customhook/useFetchCollection';
import { FILTER_BY_SEARCH } from '../redux/filterSlice';
import { selectAddToRent } from '../redux/rentSlice';

const Header = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  let handleLogout=()=>{
    signOut(auth).then(() => {
      toast.success("LoggedOut Successfully")
      navigate('/')
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  useEffect(()=>{  
    onAuthStateChanged(auth,async(user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        const docRef=doc(db,"users",uid)
        const docSnap=await getDoc(docRef)
        let obj={name:docSnap.data().username,email:docSnap.data().email,
          role:docSnap.data().role,id:uid}
        dispatch(loginuser(obj))
        
      } else {
        // User is signed out
        dispatch(logoutuser())
      }
    });
  },[auth])

  const username=useSelector(selectUserName)
  const userrole=useSelector(selectUserRole)

  let [search,setSearch]=useState('')
  const {data:cars}=useFetchCollection("cars")

  useEffect(()=>{
    if(search!= '' ){
      dispatch(FILTER_BY_SEARCH({cars,search}))
    navigate('/cars')
    }
    
  },[search])

  const rented=useSelector(selectAddToRent)
  console.log(rented)

  return (
    <Navbar expand="lg" bg="dark " data-bs-theme="dark" >
      <Container fluid>
        <Navbar.Brand href="">
            <Image new src={logo} width={50} height={50}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link to='/' as={NavLink}  
             style={({ isActive}) => {
                return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "white" : ""
                };
            }}>Home</Nav.Link>
            <Nav.Link as={NavLink}  
             style={({ isActive}) => {
                return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "white" : ""
                };
            }} to='/about'> About</Nav.Link>
{/* 

            <NavDropdown title="Cars" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Manual</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                Automatic
              </NavDropdown.Item>  
            </NavDropdown> */}

              <Nav.Link as={NavLink}  
                style={({ isActive}) => {
                return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "white" : ""
                };
               }} to='/cars'> Cars</Nav.Link>

              <Nav.Link as={NavLink}  
                style={({ isActive}) => {
                return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "white" : ""
                };
               }} to='/services'>Services</Nav.Link>

              <Nav.Link as={NavLink}  
                style={({ isActive}) => {
                return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "white" : ""
                };
              }} to='/policy'>Policy</Nav.Link>
          
          <Nav.Link as={NavLink}  
             style={({ isActive}) => {
                return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "white" : ""
                };
            }} to='/contact'>Contact</Nav.Link>
          </Nav>
          {/* {userrole=="0"  &&
          <Nav  className="me-auto">
            <Link to='/admin'  type="button"  class="btn btn-primary"  >
              Admin Panel
            </Link>
          </Nav>
          } */}
          {
            <Nav className="me-3">
              <Link className='btn btn-light text-dark btn-lg ' 
              to='/cars'>Rent Now</Link>
            </Nav>
          }
          

          <Form>
            {/* <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2" />
            <Button type="submit" variant='danger'><FaSearch/></Button>
            </InputGroup> */}
            <div className="search__box">
                <input type="text" placeholder="Search"  value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <span>
                  <FaSearch/>
                </span>
              </div>
      </Form>
          <Nav >
          <Nav.Link as={NavLink} to='/rent'><FaShoppingCart size={30}/>
          {Object.keys(rented).length!=0 &&
          <span class="badge rounded-pill text-bg-danger">Added</span> }
          </Nav.Link>
          <ShowOnLogout>
            <Nav.Link as={NavLink} to='/login'>Login<FaLock/></Nav.Link>
            <Nav.Link as={NavLink} to='/register'>Register<FaPenNib /></Nav.Link>
          </ShowOnLogout>

          <ShowOnLogIn>
            {/* <Nav.Link >Welcome {username ?<>{username}</>:"Guest"}</Nav.Link> */}
            <Nav.Link as={NavLink}  
                        style={({ isActive}) => {
                            return {
                            fontWeight: isActive ? "bold" : "",
                            color: isActive ? "white" : ""
                            };
                        }} to='/mybookings'>My Order<FaListAlt/></Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout<FaArrowAltCircleLeft /></Nav.Link>
          </ShowOnLogIn>  
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header