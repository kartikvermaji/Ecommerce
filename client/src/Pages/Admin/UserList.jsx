import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    faCheck,faXmark,faTrashCan
  } from "@fortawesome/free-solid-svg-icons";
  import { faHeart as FaLineHeart } from "@fortawesome/free-regular-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import state from '../../state/state';
import { useSnackbar} from 'notistack' 

const UserList = () => {
  const {enqueueSnackbar}=useSnackbar();
    const token=useSelector((state)=>state.token)
    const us=useSelector((state)=>state.user)
    const[users,setUsers]=useState([])
    const getAllUsers = async () => {
        const response = await axios.get("http://localhost:3000/user/",{
            headers: { authorization: token ,ADMIN:us.isAdmin},
          });
          setUsers(response.data.users)
      
      };
      const deleteHandler = async (id) => {
        if (window.confirm("You are going to Delete a user?")) {
          try {
            const response = await axios.delete(`http://localhost:3000/user/${id}`,{
                headers: { authorization: token ,ADMIN:us.isAdmin},
              });
              enqueueSnackbar("User is removed!",{variant:"success"})
            refetch();
          } catch (err) {
            enqueueSnackbar("User didn't removed!",{variant:"error"})
            toast.error(err?.data?.message || err.error);
          }
        }
      };

      useEffect(()=>{
        getAllUsers()
      },[users])

  return (
    <div className='bg-slate-200 min-h-[100vh]'>
        <Navbar/>
        <div className='flex  text-xl md:text-2xl justify-center space-x-1  pt-24  items-center'>
          <h1>Total Users : </h1>
          <h1> {users.length}</h1>
        </div>
        <div className='items-center flex flex-col'>
        <div className='flex  w-[98vw] lg:w-[90vw] justify-around text-center lg:px-5 pb-4 text-xs lg:text-xl pt-4 lg:pt-10 border-b-2 '>
            <h1 className='w-[7vw]' >ID</h1>
            <h1 className='lg:w-[7vw]' >NAME</h1>
            <h1 >EMAIL</h1>
            <h1>ADMIN</h1>
            <h1>DELETE</h1>
        </div>
        </div>
        <div className='flex  flex-col space-y-1 mt-2 justify-center items-center '>
            {users && users.map((user)=>(
                <div className='flex  space-y-2 items-center w-[98vw] lg:w-[90vw] pb-2 rounded-xl justify-around bg-slate-300'>
                    <h1 className='lg:w-[7vw] w-[8vw] overflow-hidden text-xs lg:text-base font-thin'>{user._id}</h1>
                    <h1 className='lg:w-[7vw] w-[12vw] text-xs lg:text-base overflow-hidden font-medium'>{user.username}</h1>
                    <h1 className='lg:w-[10vw] w-[20vw] text-xs lg:text-base overflow-hidden lg:pl-2 font-medium'>{user.email}</h1>
                    <h1>{user.isAdmin?(<p className='bg-green-400 lg:text-base text-slate-50 rounded-full py-1 text-xs px-2 flex items-center space-x-1'><FontAwesomeIcon icon={faCheck} /> <p className='hidden md:block'>ADMIN</p> </p> ):(<p className='bg-red-400 py-1 px-2 text-xs lg:px-5 text-slate-50 rounded-full flex items-center space-x-1 lg:text-base' ><FontAwesomeIcon icon={faXmark}  /> <p className='hidden md:block'>User</p>  </p> )}</h1>
                    <button  onClick={() => {deleteHandler(user._id)
                   }} 
                   className='bg-red-400 hover:bg-red-500 flex lg:text-base  duration-200 py-1 px-2 text-xs lg:px-3 rounded-full items-center space-x-1 text-slate-50 '
                   > <FontAwesomeIcon icon={faTrashCan} /> <p className='hidden md:block'> DELETE</p> </button>

                </div>
            ))}

        </div>
    </div>
  )
}

export default UserList