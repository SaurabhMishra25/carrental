import React, { useEffect } from 'react'
import useFetchCollection from '../../../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_CARS, selectcars } from '../../../redux/carSlice'
import { Link } from 'react-router-dom'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { deleteObject, ref } from 'firebase/storage'
import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db, storage } from '../../../firebase/config'

const ViewCar = () => {
  const {data}=useFetchCollection("cars")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(STORE_CARS(data))
  },[data])
  const allCars=useSelector(selectcars)

  let handelDelete=(id,images)=>{
    if(window.confirm("are you sure to delete this??")){
      images.forEach(img=>deleteObject(ref  (storage,img)))         
      deleteDoc(doc(db,'cars',id))
      toast.success("car deleted") 
    }
  }
  return (
    <div class="card">
    <div class="card-header">
        <h1>View Cars <Link  type="button" class="btn btn-primary float-end" to='/admin/addcar' >
                Add Car
            </Link>
        </h1>
    </div>
    <div class="card-body">
            <div class="table-responsive" >
                <table class="table table-bordered table-striped table-hover"  >
                    <thead>
                        <tr>
                            <th scope="col">Sr. No</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Model</th>
                            <th>Segment</th>
                            <th>Price With Fuel</th>
                            <th>Price Without Fuel</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allCars.length == 0 &&  <tr><td colSpan={8}>No Car Found</td></tr>}
                       {allCars.map((car,index)=>
                        <tr key={car.id}>
                            <td scope="row">{index+1}</td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.segment}</td>
                            <td>{car.pricewf}</td>
                            <td>{car.pricewof}</td>
                            <td><img src={car.images[0]} height={50} width={50}/></td>
                            <td>
                                <Link to={`/admin/editcar/${car.id}`}
                                    type="button"
                                    class="btn btn-success me-2"
                                >
                                    <FaPenAlt/>
                                </Link>
                                <button
                                    type="button"
                                    class="btn btn-danger" onClick={()=>handelDelete(car.id,car.images)}
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

export default ViewCar