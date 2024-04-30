import React, { useEffect, useState } from 'react'
import BrandImg from '/src/assets/admin/img/brand.jpg'
import { Link,useNavigate,useParams} from 'react-router-dom'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import {useSelector} from 'react-redux'
import { selectBrands } from '../../redux/brandSlice'

const AddBrand = () => {
       const {id}= useParams()
       console.log(id)

    const [brand,setBrand]=useState({name:'',desc:''})
    const navigate=useNavigate()

    const allbrands=useSelector(selectBrands)
    useEffect(()=>{
        if(id){
            let mybrand = allbrands.find(item=>item.id==id)
            setBrand(mybrand)
        }
        else setBrand({name:'',desc:''})

    },[id])

    let handleSubmit=async(e)=>{
        e.preventDefault()
        if(!id){ //add
            try{
                const docRef= collection(db,"brands")
                await addDoc(docRef,{...brand,createdAt:Timestamp.now().toMillis()})
                toast.success('Brand Added')
                navigate('/admin/viewbrand')
         }
         catch(error){
             toast.error(error.message)
         }
        }
        else{ //update
            try{
                const docRef= doc(db,"brands",id)
                await setDoc(docRef,{...brand,createdAt:brand.createdAt,editedAt:Timestamp.now().toMillis()})
                toast.success('Brand Updated')
                navigate('/admin/viewbrand')
         }
         catch(error){
             toast.error(error.message)
         }
        }
        
    }
  return (
    <div class="card">
        <div class="card-header">
            <h1>{id?"Edit ":"Add" } Brand <Link
                type="button" class="btn btn-primary float-end"to='/admin/viewbrand'>View Brands </Link>
            </h1>
        </div>
        <div class="card-body">
            <div className="row">
            <div className="col-4">
                <img src={BrandImg} className='img-fluid'></img>
            </div>
                <div className="col-8">

                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                         <label for="" class="form-label">Name</label>
                         <input type="text" class="form-control" name="name" value={brand.name}
                         onChange={(e)=>setBrand({...brand,name:e.target.value})}/>  
                    </div>
                    <div class="mb-3">
                         <label for="" class="form-label">Description</label>
                         <textarea class="form-control" name="desc"value={brand.desc}
                         onChange={(e)=>setBrand({...brand,desc:e.target.value})} rows={10} ></textarea> 
                    </div>
                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        {id? "Update":"Submit"}
                    </button>
                    
                </form>
                </div>
            </div>
          
        </div>
        
    </div>
  )
}

export default AddBrand