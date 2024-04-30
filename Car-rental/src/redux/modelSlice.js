import { createSlice } from "@reduxjs/toolkit";

const modelSlice=createSlice({
    name:'model',
    initialState:{models:[]},
    reducers:{
        STORE_MODELS(state,action){
            state.models= action.payload
        }
    }
})

export const{STORE_MODELS}=modelSlice.actions
export default modelSlice.reducer
export const selectModels=state=>state.model.models