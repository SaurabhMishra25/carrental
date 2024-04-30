import { createSlice } from "@reduxjs/toolkit";

const rentSlice=createSlice({
    name:'rent',
    initialState:{rentcar:{},url:''},
    reducers:{
        ADD_TO_RENT(state,action){
            if(state.rentcar.id != action.payload.id){
                state.rentcar= action.payload
            }
            else {
                state.rentcar={...state.rentcar}
            }
         },
        SAVE_URL(state,action){
            state.url=action.payload
        },
        EMPTY_CART(state,action){
            state.rentcar={}
        }
    }
})
export const {ADD_TO_RENT,SAVE_URL,EMPTY_CART}=rentSlice.actions
export default rentSlice.reducer
export const selectAddToRent=state=>state.rent.rentcar
export const selectURL=state=>state.rent.url