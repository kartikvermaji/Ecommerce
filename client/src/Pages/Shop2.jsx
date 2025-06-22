import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import ProductCard from "../Components/ProductCard.jsx";
import ProductCarousal from "../Components/ProductCarousal.jsx"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCategories, setProducts } from "../state/state.js";
import { MutatingDots } from "react-loader-spinner";

const Shop = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsByCategories, setProductsByCategories] = useState(products);
  const [productsByFilter, setProductsByFilter] = useState(products);

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3000/category/categories");
  
    dispatch(setCategories(res.data));
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/product/allProducts");
      setFilteredProducts(res.data.products);
      dispatch(setProducts(filteredProducts));
      // setProductsByCategories(filteredProducts)
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error; // Propagate the error to the caller
    }
  };

  const handleCheck = (id) => {
    setProductsByCategories(
      filteredProducts?.filter((product) => product.category === id)
    );
    setProductsByFilter(
      filteredProducts?.filter((product) => product.category === id)
    );
  };
  const handleBrandClick = (brand) => {
    const productsByBrand = productsByCategories?.filter(
      (product) => product.brand === brand
    );
    setProductsByFilter(productsByBrand);
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        productsByCategories
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  getCategories();
  getAllProducts();
  // useEffect(()=>{
  //   setProductsByCategories(products);
  //   setProductsByFilter(products);
  // },[products])
 

  return (
    <div className="bg-slate-200 min-h-[100vh]">
     
      <Navbar />
      {/* <ProductCarousal/> */}
      <div className="text-black flex justify-end  px-6 mt-0 pt-16 space-x-8">
      <div className="flex flex-col w-[20vw] mr-[75vw] fixed bg-black text-white pb-4 p-4 rounded-2xl">
        <button onClick={async()=>{
          getAllProducts()
            setProductsByCategories(products);
            setProductsByFilter(products);

        }}   className="bg-black text-white border-2 text-xl w-[15vw] px-6 py-1 rounded-full text-center mt-5 ml-5 hover:bg-gray-50 hover:text-black duration-200">Show All Products</button>
        <div >
          <h1 className="text-xl mt-8 text border-b-2 border-white pb-2 " >Filter By Categories</h1>
          {categories?.map((c) => (
            <div key={c._id} className="px-6">
              <input
                type="radio"
                id={c._id}
                name="Category"
                onChange={(e) => handleCheck(c._id)}
              />
              <label htmlFor="">{c.name}</label>
            </div>
          ))}
        </div>

        <div>
          <h1 className="text-xl mt-8 text border-white border-b-2 pb-2 ">Filter by Brands</h1>
          {uniqueBrands?.map((brand) => (
            <div key={brand} className="px-6">
              <input
                type="radio"
                id={brand}
                name="brand"
                onChange={() => handleBrandClick(brand)}
              />
              <label htmlFor="">{brand}</label>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setProductsByCategories(products);
            setProductsByFilter(products);
          }}
          className="bg-slate-50 w-[10vw] ml-14 text-black text-xl px-6 py-1 rounded-full text-center mt-5  hover:bg-gray-800 hover:text-slate-50 duration-200"
        >
          Reset
        </button>
        </div>

        <div className="flex h-auto  right-0 w-[75vw] justify-start  flex-wrap">
          {productsByFilter && productsByFilter.length===0 && (
            <div className="mt-32 ml-56">
              <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="DarkTurquoise"
            secondaryColor="DarkTurquoise"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
            </div>
            
          )}
          {productsByFilter?.map((prod) => (
            <div key={prod._id} className="p-5">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;