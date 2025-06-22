import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  faCartShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as FaLineHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { addToFavourites, removeFromFavorites } from "../state/state";

import { useSnackbar} from 'notistack' 

    // import { useSnackbar} from 'notistack'
    // const {enqueueSnackbar}=useSnackbar();
    // enqueueSnackbar("Product added to Favourites!",{variant:"success"})

const ProductCard = ({ product }) => {
  const navigate=useNavigate()
  const fav=useSelector((state)=>state.favourites)||[];
  const isfav=fav.some((p) => p._id === product._id);
  const dispatch=useDispatch()

  const {enqueueSnackbar}=useSnackbar();

  return (
    <div>
      <div className="lg:pb-2 pb-1 rounded-3xl w-[38vw] md:w-[20vw] lg:w-auto   ">
        <div className="flex flex-col items-center">
          <img src={product.image} alt={product.name} className="lg:h-[12em] h-[8rem] w-[8rem] lg:w-[13em]  object-contain  rounded-xl shadow-lg hover:shadow-slate-300"  onClick={()=>{navigate(`/product/${product._id}/`)}} />
          <div className="flex flex-col justify-around">
          <p className="text-sm md:text-lg lg:text-2xl font-light mt-2 text-black">{product && product.name.substring(0,16)}</p>

          <div className="flex justify-between items-center mt-[-2vh]">
          <p className="text-sm md:text-lg lg:text-2xlfont-light mt-2 text-slate-800">⭐{product.rating.toString().substring(0,3)} ({product.reviews.length} Reviews)</p>
          <p className="text-sm md:text-lg lg:text-2xl font-medium m-2 text-slate-950">₹{product.price}</p>
          </div>
          <div className="flex justify-between items-center ">
            
          <Link to={`/product/${product._id}`}>< button onClick={()=>{
            // navigate(`/product/${product._id}/`)
           
          }} className= "text-sm lg:text-lg hover:text-white bg-white  text-black border-2 rounded-full px-2 md:px-3 py-1 hover:bg-gray-900 hover:border-gray-900 duration-200"><FontAwesomeIcon icon={faCartShopping} className="hidden  md:inline" /> Add to Cart </button></Link>

<div className="">
          {fav && isfav?
          (<button className= "text-sm lg:text-lg hover:text-black bg-gray-900 text-white border-2 rounded-full px-1 md:px-2 lg:px-3 py-1 hover:bg-white hover:border-white duration-200"
          onClick={()=>{
            dispatch(removeFromFavorites(product))
            enqueueSnackbar("Product removed from Favourites!",{variant:"success"})
          }}
          ><FontAwesomeIcon icon={faHeart} /></button>)
          :(<button className= "text-sm lg:text-lg hover:text-black bg-gray-900 text-white border-2 rounded-full px-1 md:px-2 lg:px-3 py-1 hover:bg-white hover:border-white duration-200" onClick={()=>{
            dispatch(addToFavourites(product))
            enqueueSnackbar("Product added to Favourites!",{variant:"success"})
          }}><FontAwesomeIcon icon={FaLineHeart} /></button>)}</div>

          </div>
          </div>   
        </div>
      </div>
    </div>
  );
};

export default ProductCard;