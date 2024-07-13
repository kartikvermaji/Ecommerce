import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import axios from "axios";
import state, { clearCartItems, clearOrderItems, saveOrderItems } from "../state/state";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[Confirm,setconfirm]=useState(false)

  const orderItems = useSelector((state) => state.orderItems);
  const cartItems = useSelector((state) => state.cartItems);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const totalAmount = useSelector((state) => state.totalAmount);
  const shippingAddress = useSelector((state) => state.shippingAddress);

  const placeOrderHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3001/order", {
        userId: user._id,
        orderItems: orderItems,
        paymentMethod: "paypal",
        itemsPrice: totalAmount,
        shippingPrice: 0,
        taxPrice: totalAmount * 0.18,
        totalPrice: totalAmount * 0.18 + totalAmount,
        shippingAddress: shippingAddress,
      });
      // console.log(orderItems)

      dispatch(clearCartItems());
      dispatch(clearOrderItems());


       navigate(`/order/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-200 min-h-[100vh] ">
      <Navbar />
      <div className="flex flex-col px-4 md:flex-row  justify-around text-black pt-16">
      <div className="lg:w-[40vw] md:w-[65vw] w-[98vw]">
        <h1 className="text-3xl font-thin text-center my-3">Products Summary</h1>
      {cartItems.length === 0 ? (
        <p className="text-4xl font-thin">Your Cart is empty</p>
      ) : (
        <div className="bg-white p-2 md:p-4 lg:w-[55vw] rounded-2xl lg:p-6" >
          <table className="lg:px-6" >
            <thead >
              <tr className="flex lg:space-x-24 md:space-x-10 space-x-4 lg:text-xl text-center my-4 border-b-2 lg:pb-6 ">
                <td className="lg:ml-10 lg:pr-20">Image</td>
                <td>Product</td>
                <td> Quantity</td>
                <td> Price</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((prod) => (
                <>
                  {prod.item._id ? (
                    <tr key={prod.item._id} className="flex items-center lg:space-x-24 space-x-4 text-xl text-center">
                      <td>
                        <img
                          src={prod.item.image}
                          alt=""
                          className="lg:h-36 h-20 w-16 lg:w-40 object-cover rounded-2xl my-2"
                        />
                      </td>
                      <td className="text-[10px] w-[14vw] lg:text-xl">{prod.item.name}</td>
                      <td className="text-sm lg:text-xl pl-4 md:pl-0">{prod.quantity}</td>
                      <td className="text-sm lg:text-xl pl-12 lg:pl-12">${prod.item.price}</td>
                      <td className="text-sm lg:text-xl  pl-1 md:pl-12 lg:pl-0">${prod.item.price * prod.quantity}</td>
                    </tr>
                  ) : (
                    <div></div>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>

      <div className="lg:w-[30vw] w-[95vw] flex flex-col items-center">
        <h1 className="text-3xl font-thin">Order Summary</h1>

        <div className="bg-white rounded-xl w-[98vw] md:w-[32vw] lg:w-[25vw] px-6 p-4 mt-4">
          <h1 className="lg:text-2xl text-xl text-center  ">Amount</h1>
          <p className="mt-2 lg:text-xl">Items: ${totalAmount}</p>
          <p className="mt-2 lg:text-xl">Shipping: $0</p>
          <p className="mt-2 lg:text-xl">Tax: ${totalAmount * 0.18}</p>
          <p className="mt-2 lg:text-xl">Total Price: ${totalAmount + totalAmount * 0.18}</p>
        </div>

        <div className="bg-white rounded-xl md:w-[32vw] lg:w-[25vw] w-[98vw] p-4 px-6 mt-4">
          <h1 className="lg:text-2xl text-xl text-center  ">Shipping Address </h1>
          <p className="mt-2 lg:text-xl">{shippingAddress.address}</p>
          <p className="mt- lg:text-xl">{shippingAddress.city}</p>
          <p className="mt- lg:text-xl">{shippingAddress.postalCode}</p>
          <p className="mt- lg:text-xl">{shippingAddress.country}</p>
        </div>

        <div className="text-xl mt-4">
          <h1 className="lg:text-2xl">Payment Method</h1>
          <p className="font-thin text-base lg:text-xl">Paypal / Credit Card</p>
        </div>

        <button
          onClick={() => {
            placeOrderHandler();
            setconfirm(!confirm)
          }}
          className="lg:text-xl lg:px-3 px-2 py-1  mt-2 rounded-full bg-slate-50 text-black hover:bg-gray-950 hover:text-slate-50 duration-200 hover:shadow-xl hover:shadow-slate-500"
        >
          Confirm Order
        </button>
      </div>

      {confirm?(<></>):(<></>)
      }
      </div>
    </div>
  );
};

export default PlaceOrder;