import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
    const token=useSelector((state)=>state.token)
    const us=useSelector((state)=>state.user)

    const [orders,setOrders]=useState([])
    const getAllOrders = async () => {
        try {
          const res = await axios.get("http://localhost:3001/order",{
            headers: { authorization: token ,ADMIN:us.isAdmin},
          });
        setOrders(res.data);
        } catch (error) {
          console.error("Error fetching filtered products:", error);
          throw error; // Propagate the error to the caller
        }
      };
      
useEffect(()=>{
    getAllOrders()
},[])
      


  return (
    <div className='bg-slate-200 flex flex-col items-center'>
    <Navbar/>
    <div className=' flex flex-col w-[98vw] lg:w-[80vw] justify-center  min-h-[100vh] bg-slate-200 items-center'>
        <h1 className='pt-20 text-2xl font-thin'>All Orders</h1>
        <div className='flex justify-around w-[98vw] lg:w-[80vw] text-xs lg:text-xl font-thin pt-10'>
            <h1 className='lg:w-[10vw] text-center'>Order</h1>
            <h1 className='lg:w-[10vw] text-center hidden md:block'>User ID</h1>
            <h1 className='lg:w-[10vw] text-center'>Total</h1>
            <h1 className='lg:w-[10vw] text-center'>Quantity</h1>
            <h1 className='lg:w-[10vw] text-center'>Paid</h1>
            <h1 className='lg:w-[8vw] text-center'>Delivered</h1>
        </div>
        <div>
            {orders?.map((order)=>(
                <div className='flex bg-slate-300 rounded-2xl py-2 items-center justify-around w-[98vw] lg:w-[80vw] text-lg m-2'>
                    <Link to={`/order/${order._id}`}><img src={order.orderItems[0].image} alt="" className='lg:h-20 h-[3em] w-[3em] lg:w-20 rounded-xl hover:shadow-2xl hover:shadow-slate-700 duration-200 object-cover' /></Link> 
                    <h1 className='font-thin text-xs lg:text-base overflow-hidden w-[10vw] hidden md:block'>{order.user }</h1>
                    <h1 className='lg:w-[6vw] text-xs lg:text-base text-center'>₹ {order.totalPrice }</h1>
                    <h1 className='w-[6vw] text-xs lg:text-base text-center'>{order.orderItems.length }</h1>
                    <h1 className='lg:w-[5vw] w-[10vw] lg:text-base text-xs'>{order.isPaid?<p className='bg-green-400 rounded-xl  lg:rounded-full text-slate-50  py-1 text-center' >Paid</p>:<p className='bg-red-400 lg:w-[6vw] w-[10vw]  rounded-xl lg:rounded-full text-slate-50  py-1 text-center'>Not Paid</p> }</h1>
                    <h1 className='lg:w-[10vw] w-[12vw] lg:text-base overflow-hidden text-xs'>{order.isDelivered?<p className='bg-green-400 rounded-lg lg:rounded-full text-slate-50  py-1 text-center'>Delivered</p>:<p className='bg-red-400  overflow-hidden  rounded-full text-slate-50  py-1 text-center'>Not Delivered</p> }</h1>
                </div>
            ))}
        </div>
    </div>
      
    </div>
  )
}

export default Orders