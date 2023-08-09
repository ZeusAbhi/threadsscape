"use client"
import { Check } from 'lucide-react'
import React, { useEffect } from 'react'

const PaymentSuccess = () => {
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("User"));
        const userID = user.id;
        localStorage.removeItem(userID)
        localStorage.removeItem("cartCount")
        window.location.href = '/home'
    },[])
  return (
    <> 
      <div  className=' flex justify-center items-center text-[5rem]'>
      <Check size={150} color='green'/><h1>Order Recieved</h1>
      </div>
    </>
  )
}

export default PaymentSuccess