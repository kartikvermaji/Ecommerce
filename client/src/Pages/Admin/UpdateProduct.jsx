import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar} from 'notistack'
import { useDispatch, useSelector } from "react-redux";


const UpdateProduct = () => {
  const {enqueueSnackbar}=useSnackbar();
  const { id } = useParams();
  const navigate=useNavigate()

  const [product, setProduct] = useState({});
   const[con,setcon]=useState(1)

  const token = useSelector((state) => state.token);
  const us = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);

  const getProduct = async () => {
    const response = await axios.get(`http://localhost:3001/product/${id}`);
    setProduct(response.data.product);
  };
  const uploadFileHandler = async (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
      setImageUrl(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `http://localhost:3001/product/${id}`,
        {
          name: name,
          description: description,
          price: price,
          category: category,
          quantity: quantity,
          brand: brand,
          image: image,
        },
        {
          headers: { authorization: token, ADMIN: us.isAdmin },
        }
      );
      enqueueSnackbar("Product Updated!",{variant:"success"})
      navigate("/allproducts");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Product haven't Updated!",{variant:"error"})
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const result = await axios.delete(
        `http://localhost:3001/product/${id}`,
        {
          headers: { authorization: token, ADMIN: us.isAdmin },
        }
      );

      enqueueSnackbar("Product Deleted!",{variant:"success"})
      navigate("/allproducts");
    } catch (err) {
      console.log(err);
    }
  }

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3001/category/categories");
    setCategories(res.data);
  };
  useEffect(() => {
    getCategories();
    getProduct()
  }, [categories,product,onpageshow]);

  
  const [image, setImage] = useState("")
  const [name, setName] = useState( " " )
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if ( con===1 && product && product._id) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category?._id);
      setQuantity(product.quantity);
      setBrand(product.brand);
      setImage(product.image);
      setcon(2)

    }
  }, [product]);


  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center pt-6'>
      <h1 className='pt-20 text-3xl font-light'>Update Product</h1>
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

                <label htmlFor="username" className="text-slate-500 lg:text-xl text-left mt-5 font-semibold ml-4">Description</label>
               <textarea name="" id="" cols="30" rows="4" placeholder='Description'  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white border-2 w-[85vw] md:w-[40vw] lg:w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center lg:text-xl px-10 py-2 rounded-2xl  p-3"
               ></textarea>
 
               <button type='submit ' className="bg-slate-50 lg:text-lg  w-[40vw] md:w-[15vw] lg:w-[10vw]  text-black mt-4 py-1 md:py-1 rounded-2xl hover:bg-gray-950 duration-300 border-2 hover:text-slate-50">Update</button>
            <button onClick={handleDelete} className="bg-slate-50 lg:text-lg  w-[40vw] md:w-[15vw] lg:w-[10vw]  text-red-500 mt-4 py-1 md:py-1 rounded-2xl hover:bg-ref-600 duration-300 border-2 border-red-200 hover:text-red-900 hover:bg-red-500">Delete</button>
          </form>
        </div>
      </div>
      
      </div>
    </div>
  );
};

export default UpdateProduct;