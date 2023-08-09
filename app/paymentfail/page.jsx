"use client"
import { Cross } from 'lucide-react'
import React from 'react'

const PaymentFail = () => {
  return (
      <> 
         <div  className=' flex justify-center items-center text-[5rem]'>
        <Cross size={150} color='red'/><h5>Transaction Failed</h5>
        </div>
      </>
  )
}

export default PaymentFail