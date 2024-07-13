import React from "react";
import { useDispatch, useSelector } from "react-redux";
import state, { setLogout } from "../state/state";
import { useNavigate } from "react-router-dom";
import { Link,useLocation } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cartItems);
  const fav=useSelector((state)=>state.favourites)||[];
  const dispatch = useDispatch();
  return (
    <div className="flex  w-[100vw] text-center shadow-xl justify-center fixed top-12 h-8 flex-row  text-xs lg:text-lg p-2 bg-sky-500">

      <div className="flex flex-row items-center justify-around text-white md:space-x-10  text-xs md:text-lg  ">
      <Link to="/allproducts" className={ ` hover:text-slate-900 duration-200 hover:bg-slate-200 px-1 md:px-4 rounded-full  ${location.pathname === '/allproducts' ? 'bg-sky-100 text-slate-900' : ''}`}>All Products</Link>
      <Link to="/addproduct" className={` hover:text-slate-900 duration-200 hover:bg-slate-200  lg:px-4 px-1 rounded-full  ${location.pathname === '/addproduct' ? 'bg-sky-100 text-slate-900' : ''}`}>New Product</Link>
      <Link to="/userlist" className={` hover:text-slate-900 duration-200 hover:bg-slate-200 md:px-4 px-1 rounded-full  ${location.pathname === '/userlist' ? 'bg-sky-100 text-slate-900' : ''}`}>Users</Link>
      <Link to="/categories" className={`hover:text-slate-900 duration-200 hover:bg-slate-200 md:px-4 px-1 rounded-full  ${location.pathname === '/categories' ? 'bg-sky-100 text-slate-900' : ''}`}>Categories</Link>
      <Link to="/orders" className={`hover:text-slate-900 duration-200 hover:bg-slate-200 md:px-4 px-1 rounded-full  ${location.pathname === '/orders' ? 'bg-sky-100 text-slate-900' : ''}`}>Orders</Link>

      </div>

      <div>
       
      </div>
    </div>
  );
};

export default Navbar;