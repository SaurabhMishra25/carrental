import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useFetchCollection from '../../customhook/useFetchCollection'
import {useDispatch,useSelector} from 'react-redux'
import {STORE_BRANDS,selectBrands} from '../../redux/brandSlice'
import { FaPenFancy, FaTrashAlt } from 'react-icons/fa'
import {toast} from 'react-toastify'
import { db } from '../../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'


const ViewBrand = () => {
 const{data}= useFetchCollection("brands")
 const dispatch= useDispatch()
 useEffect(()=>{
    dispatch(STORE_BRANDS(data))
 },[data])
 const allbrands=useSelector(selectBrands)

 let handleDelete=async(id)=>{
    if(window.confirm("Are you sure to delete this??")){
        try{
            const docRef=doc(db,"brands",id)
            await deleteDoc(docRef)
            toast.success("Brand Deleted")
        }
        catch(error){
          toast.error(error.message)
        }
    }
 }

  return (
    <div class="card">
    <div class="card-header">
        <h1>View Brands <Link
            type="button" class="btn btn-primary float-end" to='admin/addbrand'>Add Brand </Link>
        </h1>
    </div>
    <div class="card-body">
               <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allbrands.length ==0 && <tr><td colSpan={5}>No Brand Found</td></tr> }
                    {allbrands.map((brand,index)=>
                    <tr key={brand.id}>
                      <td scope="row">{index+1}</td>
                      <td>{brand.id}</td>
                      <td>{brand.name}</td>
                      <td>{brand.desc}</td>
                      <td>
                        <Link to={`/admin/editbrand/${brand.id}`}
                           type="button"
                           class="btn btn-success me-2"
                        >
                          <FaPenFancy/>
                        </Link>
                        
                        
                        <button
                          type="button"
                          class="btn btn-danger me-2" 
                          onClick={()=>handleDelete(brand.id)}
                        >
                          <FaTrashAlt/>
                        </button>
                      </td>
                    </tr>
                    )}
                  </tbody>
                </table>
               </div>
               
            </div>
        </div>
  )
}

export default ViewBrand