import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar} from 'notistack'

const NewProduct = () => {

  const token=useSelector((state)=>state.token)
    const us=useSelector((state)=>state.user)
    const [categories, setCategories] = useState([]);
    const {enqueueSnackbar}=useSnackbar();

  const[image,setImage]=useState("")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadFileHandler = async (e) => {
   var reader=new FileReader();
   reader.readAsDataURL(e.target.files[0]);
   reader.onload=()=>{
    setImage(reader.result)
    setImageUrl(reader.result)
   }
   reader.onerror=error=>{
    console.log("Error: ",error)
   }
  };


  const handleSubmit=async(e)=>{
    e.preventDefault()
   try{
    const result = await axios.post("http://localhost:3000/product/",{
      name:name,
      description:description
      ,price:price
      ,category:category,
      image:image
    },
    {
        headers: { authorization: token ,ADMIN:us.isAdmin},
      });
      enqueueSnackbar("New Product Added!",{variant:"success"})

   } catch (error) {
    enqueueSnackbar("Product Haven't Added!",{variant:"error"})
    console.error(error);
    
  }

  }

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3000/category/categories");
    setCategories(res.data);
  };
  useEffect(() => {
    getCategories();
  }, [categories]);
  
  

  return (
    <div className=''>
      <Navbar/>
      <div className='flex flex-col justify-center items-center pt-6'>
      <h1 className='lg:pt-20 pt-16 text-3xl font-light'>Add A New Product</h1>
      <div className='flex flex-col md:flex-row mt-5' >
        <div className='flex flex-col justify-center items-center'>
        {!image && (
            <div className="text-center">
              <img
                src="https://thumbs.dreamstime.com/b/buyer-purchasing-products-vector-isometric-illustration-shop-assistant-doing-inventory-customer-choosing-holiday-presents-d-152580523.jpg"
                alt="product"
                className="lg:h-[60vh] h-[50vh] lg:w-[40vw] object-contain"
              />
            </div>
          )}
        {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="lg:h-[60vh] h-[40vh] w-[40vw] object-contain"
              />
            </div>
          )}
        <div>
          <input 
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className='lg:text-xl '
              />
        </div>
        </div>
      
       
        <div className='flex flex-col justify-center items-center border-2 border-slate-700 md:px-6 py-2 rounded-3xl'>
          <form action="" onSubmit={handleSubmit} className='flex flex-col justify-center items-center '>

          <label htmlFor="username" className="text-slate-500 lg:text-xl text-left mt-5 font-semibold ml-4">Picture URL</label>
                    <input
                  type="text"
                  placeholder='Picture'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="bg-white border-2  md:w-[40vw] lg:w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center lg:text-xl px-10 py-1 lg:py-2 rounded-full  lg:p-3"
                />

<label htmlFor="username" className="text-slate-500 lg:text-xl text-left mt-2 lg:mt-5   font-semibold ml-4">Name</label>
          <input
                  type="text"
                 
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border-2 md:w-[40vw] lg:w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center lg:text-xl px-10 py-1 lg:py-2 rounded-full  lg:p-3"
                />



                <div className='flex  items-center justify-around space-x-4 lg:space-x-20'>
                  <div className='flex flex-col'>
                  <label htmlFor="username" className="text-slate-500 lg:text-xl text-left mt-5   font-semibold ml-4">Price</label>
           <input
                  type="text"
                  placeholder='Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-white border-2 w-[40vw] md:w-[22vw] lg:w-[10vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center lg:text-xl px-10  py-1 lg:py-2 rounded-full  p-3"
                />

                  </div>

                  <div className='flex flex-col'>
                  <label htmlFor="username" className="text-slate-500 lg:text-xl text-left mt-5   font-semibold ml-4">Category</label>
                 <select
                  placeholder="Choose Category"
                  onChange={(e) => setCategory(e.target.value)}
                  className='rounded-full bg-slate-950 text-slate-50 lg:py-2 py-1 lg:text-xl text-center'
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                  </div>
                



                </div>
                  
           {/* <input
                  type="text"
                  className="border-2"
                  placeholder='Qunatity'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                /> */}
             {/* <input
                  type="text"
                  className="border-2"
                  placeholder='Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                /> */}
               <label htmlFor="username" className="text-slate-500 lg:text-xl text-left mt-5 font-semibold ml-4">Description</label>
               <textarea name="" id="" cols="30" rows="4" placeholder='Description'  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white border-2 w-[85vw] md:w-[40vw] lg:w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center lg:text-xl px-10 py-2 rounded-2xl  p-3"
               ></textarea>
                 
                 {/* <input
                  type="text"
                  className="border-2"
                  placeholder='Count in stock'
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                /> */}
               



                <button type='submit ' className="bg-slate-50 lg:text-lg  w-[40vw] md:w-[15vw] lg:w-[10vw]  text-black mt-4 py-1 md:py-1 rounded-2xl hover:bg-gray-950 duration-300 border-2 hover:text-slate-50">Add Product</button>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default NewProduct