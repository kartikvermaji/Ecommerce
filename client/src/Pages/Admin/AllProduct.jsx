import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axios from "axios";
import { Link } from "react-router-dom";

const AllProduct = () => {
    const[allProduct,setAllProduct]=useState([])

    const getAllProducts = async () => {
        try {
          const res = await axios.get("https://ecommerce-server-dml7.onrender.com/product/allProducts");
          setAllProduct(res.data.products);
        } catch (error) {
          console.error("Error fetching filtered products:", error);
          throw error; // Propagate the error to the caller
        }
      };
      
    //   useEffect(()=>{
        getAllProducts()
    //   },[])
      

  return (
    <div className='bg-slate-200 flex flex-col items-center'>
      <Navbar/>
      <div className=' flex flex-col lg:w-[80vw] p-2 justify-center min-h-[100vh] bg-slate-200 items-center'>
        <h1 className='pt-20 text-2xl font-thin'>All Products</h1>
        <div className='flex flex-wrap space-x-1 '>
        {allProduct?.map((prod)=>(
            // <div className='flex m-6 flex-col items-center rounded-2xl text-center w-[14vw] '>
            //     <img src={prod.image} alt="" className='h-36 w-40 object-cover rounded-xl' />
            //     <h1 className='text-xl '>{prod.name.substring(0,20)}</h1>
            //     <h1 className='w-[10vw]  '>{prod.description.substring(0,40)}</h1>
            //     <Link to={`/updateproduct/${prod._id}`} ><button className='border-2 border-black px-3 py-1 rounded-full'>Update</button></Link>

            // </div>
            
      <div className=" pb-2 rounded-3xl lg:m-4   ">
      <div>
      <Link to={`/updateproduct/${prod._id}`} >
        <img src={prod.image} alt={prod.name} className="lg:h-[12em] lg:w-[13em] h-[8em] w-[9em]  object-cover  rounded-xl shadow-lg hover:shadow-slate-300"  onClick={()=>{navigate(`/product/${prod._id}/`)}} /></Link>
        <div className="flex flex-col justify-around">
        <p className="lg:text-2xl font-light mt-2 w-[9em] overflow-hidden text-black pb-2">{prod && prod.name.substring(0,16)}</p>

        <div className="flex justify-between items-center mt-[-2vh]">
        <p className="lg:text-base text-xs font-light mt-2 w-[9em]   lg:w-[13rem] text-slate-800">{prod.description.substring(0,80)}</p>
        {/* <p className="text-2xl font-medium m-2 text-slate-950">${prod.price}</p> */}
        </div>
        <div className="flex justify-between items-center lg:pt-2 pt-1 ">
        <Link to={`/updateproduct/${prod._id}`} ><button className= "lg:text-lg hover:text-white bg-white hover:shadow-2xl hover:shadow-slate-600    text-black border-2 rounded-full  lg:px-3 px-2 py-1 hover:bg-gray-900 hover:border-gray-900 duration-200">Update</button></Link>
       
        </div>
        </div>   
      </div>
    </div>
        ))}
</div>

      </div>
    </div>
  )
}

export default AllProduct