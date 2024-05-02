import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { FaLock, FaSearch } from 'react-icons/fa'
import LoginImg from '/src/assets/Login.jpg'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { toast } from 'react-toastify'
import { Timestamp, getDoc,doc, setDoc } from 'firebase/firestore'
import Loader from './Loader'

const Login = () => {
  const redirect=useNavigate()
  let initialState={email:'',password:''}
    let [user,setUser]= useState({...initialState}) 
    let[errors,setErrors]=useState({})
    let [isLoading,setIsLoading]=useState(false)
    let handleSubmit=(e)=>{
      e.preventDefault()  
      
     let myerrors= validationrules()
     if(Object.keys(myerrors).length !=0){
          setErrors(myerrors)       
     }
     else{
      setIsLoading(true)
      setErrors({})
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(async(userCredential) => { 
          const user1 = userCredential.user;
          try{
            const docRef=doc(db,"users",user1.uid)
            const docSnap=await getDoc(docRef)
            if(docSnap.exists()){
              // console.log(docSnap.data())
              let role=docSnap.data().role
              if(role=='0'){
                setIsLoading(false)
                toast.success('LoggedIn Successfully')
                redirect('/admin')
              }
              else if(role=="1"){
                setIsLoading(false)
                toast.success('LoggedIn Successfully')
                redirect('/')
              }
            }
           
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
  const provider = new GoogleAuthProvider();
  let LoginWithGoogle=()=>{
    signInWithPopup(auth, provider)
    .then(async(result) => {
      const user = result.user;
      let obj={username:user.displayName,email:user.email,role:"1",createdAt:Timestamp.now().
      toMillis()}
      try{
        const docRef=doc(db,"users",user.uid)
        await setDoc(docRef,obj)
        toast.success('LoggedIn Successfully')
          redirect('/')
      }
      catch(error){
        toast.error(error.message)
      }
      
      
    }).catch((error) => {
      toast.error(error.message)
    });
  }
  let validationrules=()=>{
    let formerrors={}
    let pattern=/^([\w\!\#\$\%\^\&\*\-\+\=\.]+)\@([\w]+)\.([a-zA-Z]{2,3})$/
    
    if(user.email==''){
        formerrors.emailerr="Email is required"
    }
    else if(!pattern.test(user.email)){
        formerrors.emailerr="Invalid Email"
    }
    
    if(user.password==''){
        formerrors.pwderr="Password is required"
    }
    
    return formerrors
}
  return (
    <>
    <Container className='mt-5 shadow p-2'>
    {isLoading && <Loader/>}
      <h1 className='text-center'><FaLock/>Login Here</h1><hr/>
      <Row>
        <Col xs={6}><Image src={LoginImg} fluid/></Col>
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className='mb-3 '>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" value={user.email} 
                onChange={(e)=>setUser({...user,email:e.target.value})}></Form.Control>
                {errors.emailerr && <span className='text-danger'>{errors.emailerr}</span>}
            </Form.Group>
            
            <Form.Group className='mb-3 '>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type='password' value={user.password} 
                onChange={(e)=>setUser({...user,password:e.target.value})}></Form.Control>
                {errors.pwderr && <span className='text-danger'>{errors.pwderr}</span>}
            </Form.Group>

           <div class="d-grid gap-2">
           <Button variant='primary' type="submit">Login</Button>
           </div>
           <hr/>
           <div class="d-grid gap-2">
           <Button variant='danger' type="button" onClick={LoginWithGoogle}>Login with Google</Button>
           </div>

          </Form>
          <p>Create an Account ??<Link to='/register'>Register Here</Link></p>
        </Col>
      </Row>

    </Container>
  </>
  )
}

export default Login