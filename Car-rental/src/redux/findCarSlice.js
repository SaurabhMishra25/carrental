import { createSlice } from "@reduxjs/toolkit";

const findCarSlice=createSlice({
    name:"findCars",
    initialState:{filterCars:[],details:{},totalDays:0,totalPrice:0},
    reducers:{
        FIND_CARS(state,action){
         let {cars,details}=action.payload
         const filter = cars.filter(car =>
            car.locations.some(c => c === details.location)
          );
            state.filterCars=filter
            state.details=details

          
        },
        STORE_DETAILS(state,action){
          state.details=action.payload
        },
        TOTAL_DAYS(state,action){
          let {details}=action.payload
          console.log(details)
          if(details.edate && details.sdate){
            let days=Math.floor((new Date(details.edate)-new Date(details.sdate)) /
            (1000 * 60 * 60 * 24))
            state.totalDays=days
          }
        },
        TOTAL_PRICE(state,action){
          state.totalPrice=action.payload
        }
        }
})
export const {FIND_CARS,TOTAL_DAYS,TOTAL_PRICE,STORE_DETAILS}=findCarSlice.actions

export default findCarSlice.reducer

export const selectFilterCars=state=>state.findCars.filterCars
export const fetchDetails=state=>state.findCars.details
export const selectTotalDays=state=>state.findCars.totalDays
export const selectTotalPrice=state=>state.findCars.totalPrice