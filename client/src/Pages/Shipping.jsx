import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import state, { saveOrderItems, savePaymentMethod, saveShippingAddress } from "../state/state";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Shipping = () => {

  const shippingAddress = useSelector((state) => state.shippingAddress);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const cartItems = useSelector((state) => state.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const setorder=async()=>{

      cartItems.map((items)=>{
        if(items.item && items.item._id){
          const name=items.item.name
        const qty=items.quantity
        const image=items.item.image
        const price=items.item.price
        const product=items.item._id
        const prod={
          name,qty,image,price,product
        }
        dispatch(saveOrderItems(prod))
        }
        
      })

    
  }

  return (
    <div>
      <Navbar/>
      <div className=" bg-slate-200 text-black pt-16 min-h-[100vh] flex flex-col items-center w-[100vw] flex-nowrap">
      {/* <img src="https://static.vecteezy.com/system/resources/previews/006/407/183/non_2x/shipping-time-pixel-perfect-white-linear-icon-for-dark-theme-delivery-service-information-online-shopping-thin-line-illustration-isolated-symbol-for-night-mode-editable-stroke-arial-font-used-vector.jpg" alt="" className="absolute h-[70vh] object-contain w-[50vw] mt-[18vh] ml-[65vw]" />
      <img src="https://static.vecteezy.com/system/resources/previews/011/605/773/non_2x/vehicle-donation-pixel-perfect-white-linear-icon-for-dark-theme-charitable-auto-dealership-donated-car-thin-line-illustration-isolated-symbol-for-night-mode-editable-stroke-arial-font-used-vector.jpg" alt="" className="absolute h-[70vh] object-contain w-[50vw] mt-[18vh] ml-[-70vw]" /> */}
        <h1 className="text-3xl lg:text-5xl font-light">Shipping Address</h1>
        <form onSubmit={submitHandler}>
          <div className=" flex flex-col justify-center items-center text-center">
            <label className=" font-bold ml-[-55vw] lg:ml-[-22vw] mt-3 lg:mt-5">Address:</label>
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="lg:w-[30vw] md:w-[65vw] w-[80vw] rounded-full bg-black border-2 hover:bg-white hover:text-black text-white text-center px-10 py-2 md:text-xl hover:shadow-2xl hover:border-white hover:shadow-slate-500" 
            />

            <label className=" font-bold ml-[-60vw] lg:ml-[-22vw] mt-3 lg:mt-5">City:</label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              className="lg:w-[30vw] md:w-[65vw] w-[80vw] rounded-full bg-black border-2 hover:bg-white hover:text-black text-white text-center px-10 py-2 md:text-xl hover:shadow-2xl hover:border-white hover:shadow-slate-500" 
              
            />

            <label className=" font-bold ml-[-45vw] lg:ml-[-22vw] mt-3 lg:mt-5">Postal Code:</label>
            <input
              type="text"
              placeholder="Enter PostalCode"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
              className="lg:w-[30vw] md:w-[65vw] w-[80vw] rounded-full bg-black border-2 hover:bg-white hover:text-black text-white text-center px-10 py-2 md:text-xl hover:shadow-2xl hover:border-white hover:shadow-slate-500" 
            />

            <label className=" font-bold ml-[-55vw] lg:ml-[-22vw] mt-3 lg:mt-5" >Country:</label>
            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className="lg:w-[30vw] md:w-[65vw] w-[80vw] rounded-full bg-black border-2 hover:bg-white hover:text-black text-white text-center px-10 py-2 md:text-xl hover:shadow-2xl hover:border-white hover:shadow-slate-500" 
            />

            <label className="text-2xl md:text-3xl mt-10">Payment Method</label>
            <label>
              <input className="mt-4 text-xl"
                type="radio"
                placeholder="Enter Address"
                required
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Paypal/Credit Card
            </label>

            <button type="submit" className=" hover:bg-slate-50 rounded-full hover:text-black px-3 py-1 mt-2 bg-slate-950 text-slate-50  hover:shadow-xl hover:shadow-slate-500"
             onClick={setorder}> Continue</button>
          </div>
        </form>
      </div>
    
    </div>
  );
};

export default Shipping;