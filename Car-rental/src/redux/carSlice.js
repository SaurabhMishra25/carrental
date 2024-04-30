import { createSlice } from "@reduxjs/toolkit";

const carSlice=createSlice({
    name:'car',
    initialState:{cars:[]},
    reducers:{
        STORE_CARS(state,action){
            state.cars= action.payload
        }
    }
})
export const {STORE_CARS}=carSlice.actions
export default carSlice.reducer
export const selectcars=state=>state.car.cars