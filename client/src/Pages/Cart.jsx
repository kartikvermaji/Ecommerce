import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import CartItem from "../Components/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalAmount=useSelector((state)=>state.totalAmount)
  const navigate=useNavigate()

  return (
    <div className="bg-slate-200 text-black min-h-[100vh] ">
      <Navbar />
      <div className=" flex flex-col justify-center items-center py-16">
      <h1 className="text-3xl md:text-5xl font-light p-5">CartItems</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-4xl mt-10 border-2 rounded-xl lg:px-4 py-2 border-black ">Your Cart Is Empty</p>
      ) : (
        <div>
          {cartItems.map((items) => (
            <div key={items.item._id}>
              <CartItem product={items} />
            </div>
          ))}

<div className=" flex flex-col justify-center text-center items-center">
          <div>
            <p className="text-xl md:text-3xl ">
              Total Amount: $
              {totalAmount}
            </p>
          </div>
          <button onClick={()=>{
             navigate("/shipping");
          }} className="md:text-xl border-2 px-3 md:px-4 py-1 bg-slate-950 text-slate-50 rounded-full hover:bg-slate-50 hover:text-black duration-200 hover:shadow-2xl hover:shadow-slate-700 mt-5">Proceed to Payment</button>
          </div>
        </div>
      )}
      </div>
     
    </div>
  );
};

export default Cart;