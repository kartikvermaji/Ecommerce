import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const token=useSelector((state)=>state.token)
  const us=useSelector((state)=>state.user)

  const [order, setOrder] = useState([]);
  const[payOrder,setPayOrder]=useState({});
  const[deliverOrder,setDeliverOrder]=useState({});
  const { id } = useParams();

  const getPayOrder = async () => {
    const res = await axios.put(`http://localhost:3000/order/${id}/pay`, {
      headers: { authorization: token},
    });
    setPayOrder(res.data)
    
  };
  const getDeliverOrder = async () => {
    const res = await axios.put(`http://localhost:3000/order/${id}/deliver`, {
      headers: { authorization: token},
    });
   setDeliverOrder(res.data)
  };

  const getOrders = async () => {
    const res = await axios.get(`http://localhost:3000/order/${id}`);
    setOrder(res.data);
  };
  useEffect(()=>{
    getOrders();
    // getPayOrder()
    // getDeliverOrder()
  },[])


  // function createOrder(data, actions) {
  //   return actions.order
  //     .create({
  //       purchase_units: [{ amount: { value: order.totalPrice } }],
  //     })
  //     .then((orderID) => {
  //       return orderID;
  //     });
  // }

  // function onError(err) {
  //   console.log(err.message);
  // }

  // const deliverHandler = async () => {
  //   await deliverOrder(orderId);
  //   refetch();
  // };

  // function onApprove(data, actions) {
  //   return actions.order.capture().then(async function (details) {
  //     try {
  //       await payOrder({ orderId, details });
  //       refetch();
  //       toast.success("Order is paid");
  //     } catch (error) {
  //       toast.error(error?.data?.message || error.message);
  //     }
  //   });
  // }
  
 
  return (
    <div className="bg-slate-300  min-h-[100vh] ">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-around text-black pt-20  ">
      <div className="w-[98vw] md:w-[60vw] lg:w-[40vw]">
       
      <h1 className="text-3xl font-thin text-center my-3">Order</h1>
      <div className="bg-white lg:w-[55vw] md:w-[60vw] rounded-2xl lg:p-6" >
      <table className=" lg:px-6 ">
        <thead>
          <tr className="flex lg:space-x-20 space-x-2 md:space-x-8 px-2 text-center my-4 border-b-2 lg:pb-6 ">
            <td className="lg:ml-10 md:ml-6 lg:pr-20">Image</td>
            <td>Name</td>
            <td className="lg:pl-12">Price</td>
            <td>Quantity</td>
            <td>Total Price</td>
            
          </tr>
        </thead>
        <tbody>
          {order?.orderItems?.map((prod) => (
            <tr className="flex items-center lg:space-x-28 md:space-x-10  text- text-center"> 
              <td> <Link to={`/product/${prod.product}`}><img src={prod.image} alt="" className="md:h-24 md:w-24 h-20 w-16 lg:h-24 lg:w-28 object-cover rounded-2xl my-2" />{" "}</Link> </td>
              <td className="md:w-[7vw] w-[4vw] text-[10px] lg:text-base">{prod.name} </td>
              <td className="text-  lg:ml-0 ml-12">${prod.price} </td>
              <td className="text-  ml-6"> {prod.qty}</td>
              <td className="text-  ml-14">${prod.qty * prod.price *0.18 +prod.price}</td>
              {/* <td className="text-">{order.createdAt.substring(0,10)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      </div>

      <div className="lg:w-[30vw] md:w-[35vw] w-[98vw] flex flex-col  items-center">
      {order && order.shippingAddress?(<div>
        <h1 className="text-3xl font-thin text-center">Shipping Address</h1>
        <div className="bg-white rounded-xl w-[98vw] md:w-[32vw] lg:w-[25vw] px-6 p-4 mt-4">
        <p className="mt-2 lg:text-xl">House Address: {order.shippingAddress.address}</p>
        <p className="mt-2 ;g:text-xl">Postal Code: {order.shippingAddress.postalCode}</p>
        <p className="mt-2 lg:text-xl">City: {order.shippingAddress.city}</p>
        <p className="mt-2 lg:text-xl">Country: {order.shippingAddress.country}</p>
        </div>
      </div>):(<></>)}
      
<div >
      {order?(<div>
        <h1 className="text-3xl font-thin text-center mt-10">Order Summary</h1>
        <div className="bg-white rounded-xl w-[98vw] md:w-[32vw] lg:w-[25vw] px-6 p-4 mt-4">
        <p className="mt-2 lg:text-xl">Items Price: ${order.itemsPrice}</p>
        <p className="mt-2 lg:text-xl">Shipping Price: ${order.shippingPrice}</p>
        <p className="mt-2 lg:text-xl">Tax: ${order.taxPrice}</p>
        <p className="mt-2 lg:text-xl">Total Price: ${order.totalPrice}</p>
        </div>
       
      </div>):(<></>)}

      {order && !order.isPaid && <p className="lg:text-xl bg-red-300 px-4 py-1 rounded-full m-1 text-red-900" >Not Paid</p>}
      {order && !order.isDelivered && <p className="lg:text-xl bg-red-300 px-4 py-1 rounded-full m-1 text-red-900">Not Delivered</p>}
      {/* {order && !order.isPaid && (
        <div>
                 <PayPalButtons
                    // createOrder={createOrder}
                    // onApprove={onApprove}
                    // onError={onError}
                  ></PayPalButtons>
        </div>
      )} */}
      </div>
      </div>
      </div>


      
    </div>
  );
};

export default Order;