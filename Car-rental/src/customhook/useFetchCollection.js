import { query, set } from 'firebase/database'
import React  from 'react'
import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import { db } from '../firebase/config'
import { collection,doc, onSnapshot, orderBy } from 'firebase/firestore'

const useFetchCollection = (collectionname) => {
    const [data,setData]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        getCollectionData()
    },[])
    let getCollectionData=async()=>{
        setIsLoading(true)
        try{
            const docRef=collection(db,collectionname)
            const q=query(docRef,orderBy('createdAt','desc'))
            onSnapshot(q,(docSnap)=>{
                const allData=docSnap.docs.map(doc=>({...doc.data(),id:doc.id}))
                setData(allData)
                setIsLoading(false)
            })
        }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }

    }
  return ({data,isLoading})
}

export default useFetchCollection