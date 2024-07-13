import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { MutatingDots } from "react-loader-spinner";

const TopProducts = () => {
  const [prod, setProducts] = useState([]);

  const getProducs = async () => {
    const response = await axios.get("https://ecommerce-server-dml7.onrender.com/product/top");
    setProducts(response.data.products);
  };
  useEffect(() => {
    getProducs();
  }, []);
  return (
    <div className="bg-slate-200  text-slate-950 p-10 items-center h-auto justify-center flex  flex-col">
      <h1 className="lg:text-6xl text-4xl font-light text-slate-950 md:w-[35vw] w-[80vw] text-center m-4 border-b-2 pb-4  lg:pb-6 border-black">TOP PRODUCTS</h1>
      <div className="flex flex-row w-[95vw] lg:space-x-10 mt-6 flex-wrap lg:mt-14 justify-around">
      {prod && prod.length===0 && (<div>
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
        </div> )}
      {prod.map((product) => (
        <div key={product._id} className={ `m-1 border-2 border-black p-2 items-center lg:p-1 rounded-2xl bg-slate-200 ${product===prod[4]?"hidden lg:block":"block"}`}>
          <ProductCard product={product} />
        </div>
      ))}</div>
    </div>
  );
};

export default TopProducts;