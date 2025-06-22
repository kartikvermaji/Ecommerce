import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import Navbar from '../Components/Navbar'
import { setCategories, setProducts } from "../state/state";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import img1 from "../assets/upload.png"


const Shop = () => {
  const categories = useSelector((state) => state.categories);
  const [checked,setChecked]=useState([])
  // const checked = useSelector((state) => state.checked);
  const radio = useSelector((state) => state.radio);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch=useDispatch()

  const getAllProducts = async () => {
    try {
      const res = await axios.get("https://ecommerce-server-dml7.onrender.com/product/allProducts");
      
      // setFilteredProducts(res.data.products);
      // dispatch(setProducts(filteredProducts));
      // setProductsByCategories(filteredProducts)
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error; // Propagate the error to the caller
    }
  };
  const getCategories = async () => {
    const res = await axios.get("https://ecommerce-server-dml7.onrender.com/category/categories");
  
    dispatch(setCategories(res.data));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    setChecked(updatedChecked);
  };

  const getfilterproducts = async () => {
    const response = await axios.post(`https://ecommerce-server-dml7.onrender.com/product//filterss`,{
      checked:checked,
    
    });

    setFilteredProducts(response.data)
  //  console.log(filteredProducts);
  //  console.log("rs",response.data)
  };
  useEffect(()=>{
    getfilterproducts()
    getCategories()
    
  },[checked])
  // if(checked.length===0){
  //   getAllProducts()
  // }
 
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post("https://ecommerce-server-dml7.onrender.com/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const predictedCategory = res.data.predicted_class;
    const matchedCategory = categories.find((c) => c.name === predictedCategory);

    if (matchedCategory) {
      setChecked([matchedCategory._id]); 
    } else {
      alert("No matching category found.");
    }
  } catch (err) {
    console.error("Prediction error", err);
  }
};

  



  return (
    <div className=" flex justify-around">
    <Navbar/>
    <div className="text-slate-50 pt-16 md:pt-24 flex justify-start ">
      <div className="bg-slate-800 w-[40vw] md:w-auto p-6 rounded-lg md:rounded-2xl fixed  ml-[0vw] ">
      <h2 className="text-[12px] text-center px-1 md:px-2 md:py-2  bg-slate-100 text-black rounded-md lg:rounded-full mb-2">
              Filter by Categories
    </h2>
    <div className="mt-4">
  <button
    onClick={() => document.getElementById('imageInput').click()}
    className="bg-slate-50 rounded-2xl w-[16vw] flex items-center hover:bg-slate-200 text-white font-bold py-2 px-4 rounded"
  >
    <img src={img1} alt="" className=" h-12 pl-20 rounded-2xl" />
  </button>
  <input
    type="file"
    id="imageInput"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />
</div>

    <div className="lg:p-5 w-[7rem]   lg:w-[15rem]  ">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center md:mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="md:w-4 md:h-4 text-[2em] text-slate-950 bg-slate-800 border-gray-300 rounded focus:ring-slate-700 dark:focus:ring-blue-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 lg:text-sm text-[10px] font-medium text-white"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
      </div>
      <div className="lg:w-[70vw] w-[50vw] md:w-[72vw] md:ml-[24vw] ml-[40vw] lg:ml-[20vw] flex flex-wrap h-auto">
      {filteredProducts?.map((prod) => (
            <div key={prod._id} className=" p-3 lg:p-5">
              <ProductCard product={prod} />
            </div>
          ))}
      </div>

    </div>
    </div>
  )
}

export default Shop