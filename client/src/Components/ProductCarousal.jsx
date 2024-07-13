import axios from "axios";
import React, { useEffect, useState } from "react";
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { MutatingDots } from 'react-loader-spinner'
import { Carousel } from "@material-tailwind/react";



const ProductCarousal = () => {
    const [prod, setProducts] = useState([]);

    const getProducs = async () => {
      const response = await axios.get("https://ecommerce-server-dml7.onrender.com/product/new");
      setProducts(response.data.products);
    };
  
   
      getProducs();
   
    const[i,setI]=useState(0)

  return (
      <div className="lg:p-10 p-5 bg-gray-950   lg:rounded-[2rem] h-[100vh]  md:h-auto">
      <h1 className="lg:text-6xl text-4xl pb-4  font-light text-slate-50 text-center lg:m-4">Featured Products</h1>
      <div className="flex justify-center ">
      {
        prod && prod.length===0 && (<div>
            render(<MutatingDots
  visible={true}
  height="100"
  width="100"
  color="DarkTurquoise"
  secondaryColor="DarkTurquoise"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />)
        </div> )
      }


        {prod && prod.length!==0 && (<div className="flex justify-center mt-16 space-x-4 md:space-x-10">
 <button onClick={()=>{
        if(i>0){
            setI(i-1)
        }
        else {
            setI(4)
        }
      }} ><FontAwesomeIcon icon={faChevronLeft} className="text-white text-2xl md:text-3xl hover:text-slate-700  shadow-slate-950  drop-shadow-3xl" /></button>
      
     
      {
        prod && prod[i] && (
        <div className="flex flex-col md:flex-row justify-center w-[80vw]  md:w-[80vw] lg:space-x-32 md:space-x-4 bg-white p-5 md:p-10 rounded-2xl">
            <Link to={`/product/${prod[i]._id}`}><img src={prod[i].image} alt="" className=" border-2 border-black lg:h-[21rem] h-[11rem] md:h-[22rem] md:w-[19rem] w-[14rem] lg:w-[25rem] rounded-xl  bg-white hover:shadow-xl hover:shadow-slate-400 duration-200 object-cover" /></Link> 
            <div className="lg:w-[20vw] md:min-h-[61vh] md:w-[40vw] w-[60vw] duration-200">
                <p className="md:text-3xl text-xl font-light text-black m-2 border-b-2 pb-2  border-black">{prod[i].name.substring(0,30)}</p>
                <p className="md:text-2xl font-semibold text-black m-2">₹{prod[i].price}</p>
                <p className=" hidden md:block text-xl font-semibold text-slate-600 mt-6">Description</p>
                <p className=" hidden md:block text-lg   text-slate-500 font-light m-2">{prod[i].description.substring(0,120)}</p>
                <p className="text-xl font-semibold text-slate-600 mt-6">{prod[i].brand}</p>
                <p className="text-black font-medium">{prod[i].reviews.length} reviews</p>
                <p className="text-black font-medium">{prod[i].rating} star rating</p>
            </div>

          </div>
          )
      }
        
      <button onClick={()=>{
        if(i<4){
            setI(i+1)
        }
        else {
            setI(0)
        }
      }}><FontAwesomeIcon icon={faChevronRight} className=" text-white text-2xl md:text-3xl hover:text-slate-700  shadow-slate-950  drop-shadow-3xl" /></button>
        </div> )}
     
      </div>

      
    </div>
   
  )
}

export default ProductCarousal