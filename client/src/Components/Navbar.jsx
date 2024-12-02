import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import state, { setLogout } from "../state/state";
import { useNavigate } from "react-router-dom";
import { Link,useLocation } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const nav = useNavigate();
  const[open,setopen]=useState(false)
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cartItems);
  const fav=useSelector((state)=>state.favourites)||[];
  const dispatch = useDispatch();
  const handlelogout = async () => {
    dispatch(setLogout({}));
    nav("/");
    // enqueueSnackbar("User Logged out Successfully",{variant:"success"})
  };

  return (
    <div className="flex text-center shadow-xl justify-between px-4 lg:justify-around items-center fixed top-0 flex-row w-full text-lg p-2 bg-white">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold">Market</h1>
      </div>

      <div className="md:flex flex-row items-center space-x-1 lg:space-x-10 hidden ">
      <Link to="/home" className={`hover:text-slate-900 duration-200 hover:bg-slate-200 px-4 rounded-full py-1 ${location.pathname === '/home' ? 'bg-slate-200' : ''}`}>Home</Link>

      <Link to="/fav"className={`hover:text-slate-900 duration-200 hover:bg-slate-200 px-4 rounded-full py-1 ${location.pathname === '/fav' ? 'bg-slate-200' : ''}`}>
        <div className="flex space-x-1 "><p className="">Favourites</p>
        {fav && fav.length!==0 && <p className="bg-sky-500 text-slate-50 font-semibold text-sm px-3 rounded-full  py-1"> {fav.length}</p>}
           
        </div> </Link>
     
        <Link to="/cart" className={`hover:text-slate-900 duration-200 hover:bg-slate-200 px-4 rounded-full py-1 ${location.pathname === '/cart' ? 'bg-slate-200' : ''}`}>
        <div className="flex space-x-1 "><p className="">Cart</p>
        {/* {cartItems && cartItems.length!==0 && cartItems[0].item && <p className="bg-sky-500 text-slate-50 font-semibold text-sm px-3 rounded-full  py-1"> {cartItems.length}</p>} */}
           
        </div> </Link>

      <Link to="/shop" className={`hover:text-slate-900 duration-200 hover:bg-slate-200 px-4 rounded-full py-1 ${location.pathname === '/shop' ? 'bg-slate-200' : ''}`}>Shop</Link>
      </div>

      <div>
        {user ? (
          <div className="flex items-center space-x-2 md:space-x-3 text-left">
            <div>
            <Link to="/profile">
            <img
              src={
                "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043234-animal-avatar-bear-russian_113283.png"
              }
              alt="User-pic"
              className=" md:h-8 h-10 w-10 rounded-3xl object-contain"
            /></Link>
            </div>
            {!open &&  <FontAwesomeIcon icon={faBars} onClick={()=>{setopen(true)}}  className="md:hidden text-2xl" />}
            {open &&  <FontAwesomeIcon icon={faXmark} onClick={()=>{setopen(false)}}  className="md:hidden text-2xl" />}
            
            <div>
            <p className=" hidden md:block md:text-xl text-md font-lightbold">{user.username}</p>
            </div>
            <button onClick={handlelogout} className="hover:text-slate-950 duration-300  hover:border-slate-500 px-6 py-1 rounded-full hover:bg-slate-400  hidden md:block text-sm md:text-lg font-semibold pt-[-2px]">Logout</button>
          
          </div>
        ) : (
          <div>
            <p>
              <Link to="/" className="md:text-xl font-semibold hover:bg-slate-200 px-4 py-1 rounded-full">Login/Register</Link>
            </p>
          </div>
        )}
      </div>

      {
        open && <div className="bg-sky-500 space-y-5 font-thin text-base text-white px-2 pl-4  text-left h-[100em] right-0  fixed z-999 top-20 flex flex-col ">
          {/* <a href="/home" className="pt-4">Home</a> */}
          <Link to="/home" className="pt-4">Home</Link>
          <Link to="/fav">Favourites</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/shop">Shop</Link>
          {/* <a href="/fav">Favourites</a>
          <a href="cart">Cart</a>
          <a href="/shop">Shop</a> */}
          <p> <FontAwesomeIcon icon={faXmark} onClick={()=>{setopen(false)}} className="border-2 p-2 px-3 hover:ng-slate-50  rounded-full" /></p>
          
        </div>
      }
      
    </div>
  );
};

export default Navbar;