import React, { useRef, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { FaPenNib } from 'react-icons/fa'
import RegisterImg from '/src/assets/Register.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { toast } from 'react-toastify'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import Loader from './Loader'


const Register = () => {
  const redirect=useNavigate()
  let initialState={username:'',email:'',mobile:'',password:'',cpassword:'',role:"1"}
    let [user,setUser]= useState({...initialState})
    let [isLoading,setIsLoading]=useState(false)
    let[errors,setErrors]=useState({}) 
    // let pwdRef=useRef()
    // let btnRef=useRef()
    let handleSubmit=(e)=>{
      e.preventDefault()
      setIsLoading(true)
      
    let myerrors= validationrules()
     if(Object.keys(myerrors).length !=0){
          setErrors(myerrors)
     }
     else{
      setErrors({})
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async(userCredential) => { 
          const user1 = userCredential.user;
          try{
            const docRef=doc(db,"users",user1.uid)
            await setDoc(docRef,{...user,createdAt:Timestamp.now().toMillis()})
            toast.success("register successfully")
            redirect('/')
            setIsLoading(false)
          }
          catch(error){
            setIsLoading(false)
            toast.error(error.message)
          } 
        })
        .catch((error) => {
          setIsLoading(false)
          toast.error(error.message)
        });
     }
  
  }
  let validationrules=()=>{
    let formerrors={}
    let pattern=/^([\w\!\#\$\%\^\&\*\-\+\=\.]+)\@([\w]+)\.([a-zA-Z]{2,3})$/
    let pwdpattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[_\!\@\#\$\%\^\&\*\(\)\-\+\=\.]).{6,12}$/
    let mblpattern=/^\d{10}$/
    if(user.username==''){
        formerrors.unameerr="Username is required"
    }
    if(user.email==''){
        formerrors.emailerr="Email is required"
    }
    else if(!pattern.test(user.email)){
        formerrors.emailerr="Invalid Email"
    }
    if(user.mobile==''){
      formerrors.mobileerr="Number is required"
    }
    else if(!mblpattern.test(user.mobile)){
      formerrors.mobileerr="Number must be in 10-digit "
    }
    if(user.password==''){
        formerrors.pwderr="Password is required"
    }
    else if(!pwdpattern.test(user.password)){
        formerrors.pwderr="Password must be contain at least - 1 Uppercase, 1 Lowercase, 1 Digit, 1 Special-Char, Min 6 Max 12"
    }
    if(user.cpassword==''|| user.cpassword != user.password){
        formerrors.cpwderr="Password not Matched"
    }
    return formerrors
}
// let handleClick=()=>{
//   if(pwdRef.current.type=="password"){
//       pwdRef.current.type="text"
//       btnRef.current.innerHTML='<i class="bi bi-eye"></i>'
//   }
//   else if(pwdRef.current.type=="text"){
//       pwdRef.current.type="password"
//       btnRef.current.innerHTML='<i class="bi bi-eye-slash-fill"></i>'
//   }
// }

  return (
    <>
    <Container className='mt-5 shadow p-2'>
    {isLoading && <Loader/>}
      <h1 className='text-center'><FaPenNib/>Register Here</h1><hr/>
      <Row>
        <Col xs={6}><Image src={RegisterImg} fluid/></Col>
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3 '>
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" className={`form-control ${errors.unameerr && "is-invalid"}`} 
                value={user.username} 
                onChange={(e)=>setUser({...user,username:e.target.value})}></Form.Control>
                {errors.unameerr && <span class="text-danger">{errors.unameerr}</span>}
            </Form.Group>
            <Form.Group className='mb-3 '>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" className={`form-control ${errors.emailerr && "is-invalid"}`}
                value={user.email} 
                onChange={(e)=>setUser({...user,email:e.target.value})}></Form.Control>
                {errors.emailerr && <span class="text-danger">{errors.emailerr}</span>}
            </Form.Group>
            <Form.Group className='mb-3 '>
                <Form.Label>Mobile no.</Form.Label>
                <Form.Control name="mobile"className={`form-control ${errors.mobileerr && "is-invalid"}`}
                value={user.mobile} 
                onChange={(e)=>setUser({...user,mobile:e.target.value})}></Form.Control>
                {errors.mobileerr && <span class="text-danger">{errors.mobileerr}</span>}
            </Form.Group>
            <Form.Group className='mb-3 '>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" className={`form-control ${errors.pwderr && "is-invalid"}`}
                type='password' value={user.password} 
                onChange={(e)=>setUser({...user,password:e.target.value})}></Form.Control>
                {/* <Button type="button" className='btn btn-primary' ref={btnRef} onClick={handleClick}></Button> */}
                {errors.pwderr && <span class="text-danger">{errors.pwderr}</span>}
            </Form.Group>
            <Form.Group className='mb-3 '>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control name="cpassword" className={`form-control ${errors.cpwderr && "is-invalid"}`}
                type="password" value={user.cpassword} 
                onChange={(e)=>setUser({...user,cpassword:e.target.value})}></Form.Control>
                {errors.cpwderr && <span class="text-danger">{errors.cpwderr}</span>}
            </Form.Group>
            <Button variant='primary' type="submit">Submit</Button>
          </Form>
          <p>Already an Account ??<Link to='/login'>Login</Link></p>
        </Col>
      </Row>

    </Container>
</>
  )
}

export default Register