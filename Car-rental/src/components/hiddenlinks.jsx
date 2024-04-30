// import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import Header from "./Header"
import { selectIsLoggedIn , selectUserRole} from "../redux/authSlice"
import {Navigate,useNavigate} from 'react-router-dom'
import AdminHeader from "./Admin/AdminHeader"
import { FaArrowAltCircleLeft } from "react-icons/fa"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import {toast} from 'react-toastify'
import UFooter from "./UFooter"


export const UserLayout=({children})=>{
    return(
        <>
        <Header/>
            {children}
        <UFooter/>
        </>
    )
}

export const ShowOnLogIn=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn)return children
    else return null
}
export const ShowOnLogout=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    if(!isLoggedIn)return children
    else return null
}

export const ProtectedAdmin=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const role=useSelector(selectUserRole)
    if(isLoggedIn && role=="0")return children
    else return <Navigate to='/login' replace={true}></Navigate>
}

export const Protected=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const role=useSelector(selectUserRole)
    if(isLoggedIn && role=="1") return children
    else return <Navigate to='/login' replace={true}></Navigate>
}

export const AdminLayout=()=>{
    return (<>

                 <ProtectedAdmin>
                    <AdminHeader/>
                </ProtectedAdmin>
            
        </>)
}

export const Logout=()=>{
    const navigate=useNavigate()
    let handleLogout=()=>{
        signOut(auth).then(() => {
          toast.success("loggedOut successfully")
          navigate('/')
        }).catch((error) => {
          toast.error(error.message)
        });
      }
    
    return(
        <>
            <span onClick={handleLogout}><FaArrowAltCircleLeft /> Logout</span>
        </>
    )
}