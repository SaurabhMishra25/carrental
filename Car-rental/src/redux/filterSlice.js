import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
    initialState:{filterCars:[],searchvalue:'',brandname:'',price:''},
    reducers:{
        FILTER_BY_SEARCH(state,action){
            console.log(action)
            let {cars,search}=action.payload
            if(search !=''){
                let filters=cars.filter(item=>item.brand.includes(search) || item.model.includes(search))
                state.filterCars=filters
            }
            state.searchvalue=search
        },
        FILTER_BY_BRAND(state,action){
         
            let {allCars,brand}=action.payload
            if(brand !=''){
                let filters=allCars.filter(car=>car.brand==brand)
                state.filterCars=filters
            }
            state.brandname=brand
        },
        FILTER_BY_PRICE(state,action){
            let {allCars,price}=action.payload
           
            if(price !=''){
                const filters = [...allCars].sort((a, b) => {
                    return price === 'low' ? a.pricewf - b.pricewf : b.pricewf - a.pricewf;
                  });
                  console.log(filters)
                state.filterCars=filters
            }
            state.price=price
        }
    }
})
export const {FILTER_BY_BRAND,FILTER_BY_PRICE,FILTER_BY_SEARCH}=filterSlice.actions

export default filterSlice.reducer

export const selectFilters=state=>state.filter.filterCars
export const selectsearch=state=>state.filter.searchvalue
export const selectbrand=state=>state.filter.brandname
export const selectprice=state=>state.filter.price