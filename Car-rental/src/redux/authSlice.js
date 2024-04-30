import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:sessionStorage.getItem("loginuser") ? JSON.parse(sessionStorage.getItem("loginuser")).isLoggedIn: false ,
        
        userName:sessionStorage.getItem("loginuser") ? JSON.parse(sessionStorage.getItem("loginuser")).name: null, 
        userEmail:sessionStorage.getItem("loginuser") ? JSON.parse(sessionStorage.getItem("loginuser")).email: null, 
        userRole:sessionStorage.getItem("loginuser") ? JSON.parse(sessionStorage.getItem("loginuser")).role: null, 
        userId:sessionStorage.getItem("loginuser") ? JSON.parse(sessionStorage.getItem("loginuser")).id: null},
    reducers:{
        loginuser(state,action){
            console.log(action.payload)
            let{name,email,role,id}=action.payload
            state.isLoggedIn=true
            state.userName=name
            state.userEmail=email
            state.userRole=role
            state.userId=id
            sessionStorage.setItem("loginuser",JSON.stringify({...action.payload,isLoggedIn:true}))
        },
        logoutuser(state,action){
            state.isLoggedIn=false
            state.userName=null
            state.userEmail=null
            state.userRole=null
            state.userId=null
            sessionStorage.removeItem("loginuser")
        }
    }

})
console.log(authSlice.actions)
export const {loginuser,logoutuser}=authSlice.actions
export default authSlice.reducer

export const selectIsLoggedIn= (state)=>state.auth.isLoggedIn
export const selectUserName= (state)=>state.auth.userName
export const selectUserEmail= (state)=>state.auth.userEmail
export const selectUserId= (state)=>state.auth.userId
export const selectUserRole= (state)=>state.auth.userRole
