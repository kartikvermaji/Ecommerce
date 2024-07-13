import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [order, setOrder] = useState([]);

  const getuserOrder = async () => {
    const res = await axios.get(`http://localhost:3001/order/mine/${user._id}`);
    setOrder(res.data);
  };
  useEffect(()=>{
    getuserOrder()
  },[])
  
 

  return (
    <div className="bg-slate-200 text-black items-center min-h-[100vh] flex  flex-col ">
      <Navbar />
      {/* Profile
      <div className="text-slate-50 pt-10">
        <h1>Your Profile</h1>
        <img
          src={
            "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043234-animal-avatar-bear-russian_113283.png"
          }
          alt="User-pic"
          className="md:h-14 md:w-14 h-10 w-10 rounded-3xl object-contain text-white "
        />
        <p>{user.name}</p>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.name}</p>
      </div> */}
      <div className="flex flex-col justify-around lg:w-[80vw] text-center pt-20 text-black">
        <h1 className="text-3xl lg:text-4xl font-thin mb-14">Your Orders</h1>
        <table>
          <thead className=" ">
            <tr className="lg:text-2xl border-b-2  md:space-x-12 space-x-4 justify-center items-center lg:pb-6 flex lg:space-x-44" >
              <td className="lg:pl-10">Image</td>
              <td className="lg:pl-20 pl-4 ">Id</td>
              <td className="lg:pl-20 md:pl-8">Date</td>
              <td>Total</td>
              <td>View More </td>
            </tr>
          </thead>

          <tbody className="flex flex-col lg:space-y-10 ">
            {order && order.length===0 && <p className="text-4xl font-thin text-center mt-5">You Have'nt Ordered Yet</p> }
            {order?.map((prod) => (
              <tr key={prod._id} className=" space-x-4 border-b-2 py-2 lg:py-5 border-slate-800 flex lg:space-x-28 mt-5 items-center justify-center" >
                <td>
                  <img
                    src={prod.orderItems[0].image}
                    alt=""
                    className="lg:h-40 h-16 w-16 lg:w-44 object-cover rounded-2xl"
                  />
                </td>
                <td className="lg:text-xl overflow-hidden md:overflow-visible text-[10px] w-[15vw] md:w-auto  font-light">{prod._id}</td>
                <td className="lg:text-xl text-xs font-light w-[15vw] whitespace-pre-wrap">{prod.createdAt.substring(0, 10)}</td>
                <td className="lg:text-xl text-xs font-light">${prod.totalPrice}</td>
                <td className="lg:text-xl w-[10vw]  text-sm font-medium text-sky-500 hover:text-sky-700">
                  <Link to={`/order/${prod._id}`}>View More</Link>
                </td>
                {/* <td onClick={navigate(`order/prod._id`)} >View Order</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;