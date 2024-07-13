
import Navbar from '../Components/Navbar'
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
// import { MutatingDots } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import state from '../state/state';

const Favourite = () => {
    const [prod, setProducts] = useState([]);
    const fav=useSelector((state)=>state.favourites)||[];
    
 
  useEffect(() => {
    setProducts(fav);
  }, [fav]);
  return (
    <div >
        <Navbar/>
        <div className="bg-slate-200 items-center flex flex-col min-h-[100vh] text-slate-950 md:p-10">
      <h1 className="lg:text-7xl text-4xl font-light text-slate-950  text-center m-4 flex flex-col justify-center items-center mt-14 ">Your Favourites</h1>
      <div className="flex flex-row items-center justify-center mt-4 md:mt-20 md:ml-10 w-[90vw] h-auto flex-wrap ">
      {prod && prod.length===0 && (<div>
          {/* <MutatingDots
  visible={true}
  height="100"
  width="100"
  color="DarkTurquoise"
  secondaryColor="DarkTurquoise"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> */}
  <p className='text-4xl font-light'>You haven't like any product</p>
        </div> )}
      {prod.map((product) => (
        <div key={product._id} className='md:m-4 m-2'>
          <ProductCard product={product} />
        </div>
      ))}</div>
      </div>
    </div>
  );

}

export default Favourite