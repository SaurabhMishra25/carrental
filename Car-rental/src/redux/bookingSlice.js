import { createSlice } from "@reduxjs/toolkit";

const bookingSlice=createSlice({
    name:'booking',
    initialState:{booking:{}},
    reducers:{
        STORE_BOOKING(state,action){
            state.booking= action.payload
        }
    }
})
export const {STORE_BOOKING}=bookingSlice.actions
export default bookingSlice.reducer
export const selectbooking=state=>state.booking.booking