import { createSlice } from "@reduxjs/toolkit";

const brandSlice=createSlice({
    name:'brand',
    initialState:{brands:[]},
    reducers:{
        STORE_BRANDS(state,action){
            state.brands= action.payload
        }
    }
})

export const{STORE_BRANDS}=brandSlice.actions
export default brandSlice.reducer
export const selectBrands=state=>state.brand.brands