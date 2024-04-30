import React, { useEffect,useState } from 'react'
import useFetchCollection from '../../../customhook/useFetchCollection'
import { ref, uploadBytesResumable , getDownloadURL, deleteObject} from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import {toast} from 'react-toastify'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectcars } from '../../../redux/carSlice'
import { locations } from '../../location'

let initialState={brand:'',model:'',power:'',engine:'',images:[],gearbox:'',
segment:'',fuel:'',count:'',locations:[],pricewf:'',pricewof:''}
const AddCar = () => {

  const handleSelectChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setCar({...car,locations:selected})
  };

  const navigate=useNavigate()
  let Segment=["Sedan","SUV","Van","Sports"]
  let [car,setCar]=useState({...initialState})
  let [uploadProgress,setUploadProgress]=useState(0)
  const {data:brands}=useFetchCollection("brands")
  const {data:models}=useFetchCollection("models")

  
  let [selectBrand,setSelectBrand]=useState('')
  let [allModels,setAllModels]=useState([])
  let [selectModel,setSelectModel]=useState('')

  useEffect(()=>{
    if(selectBrand !=''){
      let filterModels=models.filter(item=>item.brand==selectBrand)
      setAllModels(filterModels)
      // setCar({...car,brand:selectBrand})
    }
  },[selectBrand])

  const {id}=useParams()
const allCars=useSelector(selectcars)
const [oldImages,setOldImages]=useState([])
const [newImages,setNewImages]=useState([])
const [edit,setEdit]= useState(false)
useEffect(()=>{
  if(id){
    let cardata=allCars.find(item=>item.id==id)
    setCar(cardata)
    setEdit(true)
    setSelectBrand(cardata.brand)
    setSelectModel(cardata.model)
    setOldImages(cardata.images)
  }
  else setCar({...initialState})
},[id])

let removeImage=(index,image)=>{
  const updatedImages=[...oldImages]
  updatedImages.splice(index,1)
  setOldImages(updatedImages)
  deleteObject(ref(storage,image))
}
  
let handleImages=(e)=>{
  let allImages=e.target.files
  let arr=[]
  Array.from(allImages).forEach((file)=>{
    let storageRef = ref(storage,`car-rental/cars/${Date.now()}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',(snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress)
        
    }, 
    (error) => {toast.error(error.message)  }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       arr.push(downloadURL)
       setNewImages(prevImages=>[...prevImages,downloadURL])
      });
    }
);
  })
  setCar({...car,images:arr})
}

  let handleSubmit=async(e)=>{
    e.preventDefault()
    if(!id){
    try{
      const docRef=collection(db,"cars")
      await addDoc(docRef,{...car,
         brand:selectBrand,model:selectModel,createdAt:Timestamp.now().toMillis()})
      toast.success("car added")
      navigate('/admin/viewcar')
    }
    catch(error){toast.error(error.message)}
  } 
else {
    const updatedImages=[...oldImages,...newImages]
    try{
        const docRef=doc(db,"cars",id)
        await setDoc(docRef,{...car,
          images:updatedImages,createdAt:car.createdAt,editedAt:Timestamp.now().toMillis()})
        toast.success('Car updated')
        navigate('/admin/viewcar')
    }
    catch(error){
        toast.error(error.message)
    }
  }
}
  
  return (
    <div className='container mt-5'>
        <div className="card">
          <div className="card-header">
            <h1>{id?"Edit ":"Add "} Car
                <Link  type="button" class="btn btn-primary float-end" to='/admin/viewcar'>
                  View Car
                </Link></h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="" class="form-label">Brand</label>
                <select class="form-select" value={selectBrand} onChange={(e)=>{setSelectBrand(e.target.value);
                setEdit(false)}}>
                  <option value='' disabled>Select one</option>
                  {brands.map((brand,i)=>
                <option key={i}>{brand.name}</option>)}
                </select>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Model</label>
                <select class="form-select"  value={selectModel} onChange={(e)=>{
                    setSelectModel(e.target.value)}}>
                  {(id && edit) ? <option>{selectModel}</option>
                  :
                  <> 
                  <option value='' disabled>Select one</option>
                  {allModels.map((model,i)=>
                  <option key={i}>{model.name}</option>)}
                  </>
                  }
                </select>
              </div>
              <div className="row">
                  <div class="mb-3 col">
                    <label for="" class="form-label">Power</label>
                    <input  type="text" name="power" class="form-control" value={car.power}
                    onChange={(e)=>setCar({...car,power:e.target.value})}  />
                  </div>
                  <div class="mb-3 col">
                    <label for="" class="form-label">Engine</label>
                    <input  type="text" name="engine" class="form-control" value={car.engine}
                    onChange={(e)=>setCar({...car,engine:e.target.value})}  />
                  </div>
              </div>
              {uploadProgress > 0 && <div class="progress">
                <div class="progress-bar" style={{width: `${uploadProgress}%`}}>
                  {uploadProgress < 100 ? `uploading ${uploadProgress}%` :`uploaded ${uploadProgress}%`}
                  </div>
                  </div>}
              <div class="mb-3">
                <label for="" class="form-label">Images</label>
                <input type="file" class="form-control" name="images" multiple onChange={handleImages}/>
              </div>
              {id && <>
              {oldImages.map((img,i)=><><img src={img} height={80} width={80}/>
              <span className='me-2'style={{position:'relative',top:'-20px',cursor:'pointer'}}
              onClick={()=>removeImage(i,img)}>X</span>
              </>)}
              </>}
              <div className="row">
                <div class="mb-3 col-4">
                  <label for="" class="form-label">GearBox</label>
                  <select class="form-select" name="gearbox" value={car.gearbox}
                    onChange={(e)=>setCar({...car,gearbox:e.target.value})}>
                    <option value=''disabled>Select one</option>
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>
                <div class="mb-3 col-4">
                  <label for="" class="form-label">Segment</label>
                  <select class="form-select" name="segment" value={car.segment}
                    onChange={(e)=>setCar({...car,segment:e.target.value})}>
                    <option value='' disabled>Select one</option>
                    {Segment.map((segment,i)=><option key={i}>{segment}</option>)}
                  </select>
                </div>
                <div class="mb-3 col-4">
                  <label for="" class="form-label">Fuel Type</label>
                  <select class="form-select" name="fuel" value={car.fuel}
                    onChange={(e)=>setCar({...car,fuel:e.target.value})}>
                    <option value='' selected disabled>Select one</option>
                    <option>CNG</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>EV</option>
                    <option>Hybrid</option>
                  </select>
                </div></div>
                <div className="row">
                  <div class="mb-3 col">
                    <label for="" class="form-label">Car count</label>
                    <input  type="number" name="count" class="form-control" value={car.count}
                    onChange={(e)=>setCar({...car,count:e.target.value})} />
                  </div>
                  <div class="mb-3 col">
                    <label for="" class="form-label">Available Locations</label>
                    <select className='form-select' multiple onChange={handleSelectChange}>
                      {locations.map((loc,i)=><option key={i}>{loc}</option>)}
                    </select>
                  </div>
              </div>
              <div className="row">
                  <div class="mb-3 col">
                    <label for="" class="form-label">Price/KM With Fuel</label>
                    <input  type="number" name="pricewithfuel" class="form-control"  value={car.pricewf}
                    onChange={(e)=>setCar({...car,pricewf:e.target.value})} />
                  </div>
                  <div class="mb-3 col">
                    <label for="" class="form-label">Price/KM without Fuel</label>
                    <input  type="number" name="pricewithoutfuel" class="form-control" value={car.pricewof}
                    onChange={(e)=>setCar({...car,pricewof:e.target.value})} />
                  </div>
              </div>
              <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary" >
              {id? "Update ": "Submit"}
              </button>
              </div>
              </form>
              </div>
          </div>
        </div>
  )
}

export default AddCar