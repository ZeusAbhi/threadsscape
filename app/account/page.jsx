"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Account = () => {
    const [orderData,setOrderData]=useState([])
    const[order,setOrder]=useState([])
    useEffect(()=>{
         const getOrder=async ()=>{
          const user = JSON.parse(localStorage.getItem("User"));
        const userID = user.id;
            const data= await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/getorder`,{
              id:userID
            })
             
            console.log("data from backend",data);
            setOrderData(data.data)
         }
         getOrder()
    },[])
    useEffect(()=>{
        console.log("orderdata",orderData);
    },[orderData])
    // useEffect(()=>{
    //     (()=>{
    //         if (orderData && orderData.length > 0) {
    //             const updatedOrders = orderData
    //               .map((e) => e.order)
    //               .filter((order) => order.length > 0);
              
    //             setOrder((prevOrders) => [...prevOrders, ...updatedOrders]);
    //           }
    //     })()
    // },[orderData])
    useEffect(() => {
        if (orderData && orderData.length > 0) {
          const updatedOrders = orderData
            .map((e) => e.order)
            .filter((order) => order.length > 0);
          
          setOrder(updatedOrders); // Set the state to the updatedOrders directly
        }
      }, [orderData]);
      
    // useEffect(() => {
    //     if (orderData && orderData.length > 0) {
    //         const allOrderItems = orderData.reduce((accumulator, orderEntry) => {
    //             return [...accumulator, ...orderEntry.order.items];
    //         }, []);
    
    //         setOrder(allOrderItems);
    //     }
    // }, [orderData]);
    useEffect(()=>{
        console.log("orders",order);
    },[order])
  return (
     <>
        {/* <h1 className='text-2xl text-center'>My orders</h1>
       <div className='flex flex-col my-5 gap-10 justify-center mx-5  items-start'>
           {
            order.length>0 && order.map((e)=>{
                return(
                    <>
                      <div className='flex  gap-6 border-2 border-gray-100 rounded-md h-[18vh] relative  w-[80vw]'>
                         <div className=' w-24 h-24 bg-cover'>

                         <img src={e.thumbnail}  alt="" />
                         </div>
                         <div className='flex flex-col gap-2'>
                          <p className='text-lg'>{e.title}</p>
                          <p className='text-sm '>Size:{e.description}</p>
                          <p className='text-sm'>Quantity:{e.quantity}</p>
                           <p className='text-sm'>Status:🟢 Delivered</p>
                         </div>
                         <img src="./fedex.svg" className=' md:w-14 md:h-15 w-24 h-24 absolute right-0' alt="" />
                      </div>
                    </>
                )
            })
           }
       </div> */}
       <h1 className='text-2xl text-center'>My orders</h1>
<div className='flex flex-col my-5 gap-10 justify-center mx-5 items-center'>
  {order.length > 0 ? (
    order.map((orderItems, index) => (
      <div key={index} className='flex flex-col gap-6'>
        {orderItems.length > 0 ? (
          orderItems.map((item, itemIndex) => (
            <div key={itemIndex} className='flex gap-8 border-2 border-gray-100 rounded-md h-[20vh] relative w-[80vw]'>
              <div className='w-24 h-24 bg-cover'>
                <img src={item.thumbnail} alt="" />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-lg md:text-[0.8rem]'>{item.title}</p>
                <p className='text-sm md:text-[0.6rem]'>Size: {item.description}</p>
                <p className='text-sm md:text-[0.6rem] '>Quantity: {item.quantity}</p>
                <p className='text-sm md:text-[0.6rem]'>Status: 🟢 Delivered</p>
              </div>
              <img src="./fedex.svg" className='md:w-14 md:h-15 w-24 h-24 absolute right-0' alt="" />
            </div>
          ))
        ) : (
          <p className='text-center text-lg'>No items available in this order.</p>
        )}
      </div>
    ))
  ) : (
    <p className='text-center text-lg'>No orders available.</p>
  )}
</div>

     </>
  )
}

export default Account