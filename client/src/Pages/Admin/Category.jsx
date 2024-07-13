import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
faPlus,
faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar} from 'notistack'

const Category = () => {
    const token=useSelector((state)=>state.token)
    const us=useSelector((state)=>state.user)
    const {enqueueSnackbar}=useSnackbar();

  const [categories, setCategories] = useState([]);
  
  const[name,setName]=useState("")
  const[modal,setModal]=useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault()
   try{
    const result = await axios.post("http://localhost:3001/category/",{
        name:name
    },
    {
        headers: { authorization: token ,ADMIN:us.isAdmin},
      });

   } catch (error) {
    console.error(error);
    
  }

  }
  const handleUpdate=async(e)=>{
    e.preventDefault()
   try{
    const result = await axios.put(`http://localhost:3001/category/${selectedCategory._id}`,{
        name:updatingName
    },
    {
        headers: { authorization: token ,ADMIN:us.isAdmin},
      });
      enqueueSnackbar("Category Updated!",{variant:"success"})
      setModal(false);
                  setSelectedCategory(null);
                  setUpdatingName("");

   } catch (error) {
    console.error(error);
    enqueueSnackbar("Category haven't Updated!",{variant:"error"})
    toast.error("Creating category failed, try again.");
  }

  }
  const handleDelete=async(e)=>{
    e.preventDefault()
   try{
    const result = await axios.delete(`http://localhost:3001/category/${selectedCategory._id}`,
       {
        headers: { authorization: token ,ADMIN:us.isAdmin},
      });
      enqueueSnackbar("Category Deleted!",{variant:"success"})
      setModal(false);
      setSelectedCategory(null);
      setUpdatingName("");

   } catch (error) {
    console.error(error);
    enqueueSnackbar("Category haven't deleted!",{variant:"error"})
  }

  }
  const getCategories = async () => {
    const res = await axios.get("http://localhost:3001/category/categories");
  
    setCategories(res.data);
  };
  useEffect(() => {
    getCategories();
  }, [categories]);

  return (
    <div className="bg-slate-200 min-h-[100vh]">
      <Navbar />
      <div className="pt-24 flex flex-col justify-center items-center">
        <h1 className=' text-3xl font-light'>Manage Categories</h1>

        <div >
          <form onSubmit={handleSubmit} className="flex m-4 lg:pt-8 space-x-4 flex-col justify-center items-center">
            <h1 className='text-xl md:text-2xl font-medium'>New Category</h1>
            <div className="flex justify-center">
            <input
              type="text"
              className="mt-4 bg-white border-2 w-[70vw] lg:w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center lg:text-xl px-10 py-1 lg:py-2 rounded-full  lg:p-3"
              placeholder="Write category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="bg-slate-50 text-2xl px-4 py-2  text-black mt-4  rounded-full hover:bg-gray-950 duration-300 border-2 hover:text-slate-50"><FontAwesomeIcon icon={faPlus} /></button>
            </div>
            
          </form>
        </div>
<div className="lg:w-[80vw] w-[95ve] pt-5">
        <div className="flex justify-center space-x-5 flex-wrap">
          {categories?.map((cat) => (
            <button className="border-2 border-black m-1 lg:m-2 lg:text-xl hover:bg-sky-500 duration-200 hover:text-slate-50 hover:border-sky-500 rounded-full px-3 py-1" key={cat._id}  onClick={() => {
                {
                  setModal(true);
                  setSelectedCategory(cat);
                  setUpdatingName(cat.name);
                }
              }}>
              {cat.name}
            </button>
          ))}
        </div>
        </div>
        <div>
            {modal && (<div className="bg-slate-50 absolute mt-[-80vh] lg:mt-[-32vh] ml-[-40vw] lg:ml-[-16vw] p-2 lg:p-6 rounded-2xl flex flex-col justify-center items-center">
                <h1 className=' md:text-2xl font-medium'>Update Category</h1>
                <form onSubmit={handleUpdate} className="space-x-4 lg:mt-4 flex flex-col items-center">

                <input type="text"
                className="mt-4 bg-white border-2 w-[80vw] md:w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center text-sm lg:text-xl px-10 py-2 rounded-full  p-3"
                 value={updatingName}  onChange={(e) => setUpdatingName(e.target.value)} />
                <button type="submit"  className="bg-slate-50 px-3 text-xs lg:text-lg  py-1  text-black mt-4 lg:w-[8vw] rounded-full hover:bg-gray-950 duration-300 border-2 hover:text-slate-50">Rename</button>

                </form>

                <button onClick={handleDelete} className="bg-slate-50 text-red-500 text-xs px-3 lg:text-lg md:text-xl lg:w-[8vw] mt-2 lg:mt-4 ml-5 py-1 md:py-1 rounded-full hover:bg-red-500 duration-300 border-2 hover:text-slate-50">Delete</button>

                <button onClick={() => {
                {
                  setModal(false);
                  setSelectedCategory(null);
                  setUpdatingName("");
                }
              }}><FontAwesomeIcon icon={faXmark} className=" lg:mt-2  lg:ml-2 ml-4 mt-1 lg:text-2xl border-2 border-black rounded-full p-1 px-2 hover:bg-slate-950  hover:text-slate-50 duration-200" /></button>
               

            </div> )}
        </div>
      </div>
    </div>
  );
};

export default Category;