import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import state, { addToCart, setProducts } from "../state/state";
import Navbar from "../Components/Navbar";
import {
  faArrowLeft,
  faMinus,
  faPlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../Components/ProductCard";
import { MutatingDots } from "react-loader-spinner";
import { useSnackbar} from 'notistack'

const ProductInfo = () => {
  const {enqueueSnackbar}=useSnackbar();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [item, setItem] = useState({});
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [rate, setrate] = useState(5);

  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("https://ecommerce-server-dml7.onrender.com/product/allProducts");
      dispatch(setProducts(res.data.products));
      // setProductsByCategories(filteredProducts)
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error; // Propagate the error to the caller
    }
  };
  const getProduct = async () => {
    const response = await axios.get(`https://ecommerce-server-dml7.onrender.com/product/${id}`);
    setItem(response.data.product);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://ecommerce-server-dml7.onrender.com/product/${id}/reviews`,
        {
          rating: rate,
          comment: comment,
          user: user,
        }
      );
      enqueueSnackbar("Review added!",{variant:"success"})
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    getAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const relProd = products?.filter(
    (product) => product.category === item.category
  );
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  

  return (
    // <div ref={scrollRef} style={{ height: 0 }}>
      <div ref={scrollRef} style={{ height: 0 }} >
      <Navbar />
      <div className="lg:pt-20 pt-16 bg-slate-200 ">
        {item && !item.image && (<div className="mt-[30vh] ml-[30vw]">
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
        {item && (
          <div>
            <Link
              to="/home"
              className="fixed md:text-2xl text-white bg-slate-800 px-3 py-1 md:px-5 md:py-3 hover:text-slate-900 ml-10 hover:bg-slate-100 rounded-full"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div className="flex flex-col md:flex-row items-center justify-around space-x-14 md:px-20 ">
              <img
                src={item.image}
                alt=""
                className="lg:h-[90vh] h-[45vh] w-[80vw] lg:w-[40vw] rounded-2xl shadow-xl object-contain"
              />
              <div className="md:w-[55vw] w-[90vw] mt-6 md:p-6 rounded-2xl h-[90vh] text-slate-900">
                <p className=" text-2xl lg:text-5xl font-light text-black ">
                  {item.name}
                </p>
                <p className="lg:mt-5 mt-2 text-xl lg:text-3xl font-semibold text-slate-950">
                  ${item.price}
                </p>
                <p className="lg:mt-5 mt-2 text-xl lg:text-2xl font-semibold text-slate-950 mb-2">
                  Description:
                </p>
                {item.description && (
                  <p className="border-b-2 w-[80vw] md:w-[35vw] lg:w-auto text-[12px] text-justify lg:text-base pb-6">{item.description.substring(0, 300)}</p>
                )}

                <div className="flex flex-col items-start lg:flex-row justify-between lg:space-x-32">
                  <div>
                   
                    <p className="lg:text-lg mt-1 lg:mt-5">
                      Added: {item.createdAt && item.createdAt.substring(0, 10)}
                    </p>
                    <p className="lg:text-lg lg:mt-2">Reviews: {item.numReviews}</p>
                    {item.rating>=0 && <p className="lg:text-lg lg:mt-2">Ratings: ⭐{item.rating.toString().substring(0,3)} stars</p>}
                    
                  </div>

                  <div className=" w-[75vw] md:w-[30vw] flex flex-col lg:text-xl border-2 border-black p-2 lg:p-6 rounded-3xl items-center justify-center mt-12">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          if (qty >= 2) {
                            setQty(qty - 1);
                          }
                        }}
                        className=" bg-slate-700  py-1 px-3 lg:py-2 rounded-full text-center hover:text-slate-900 hover:bg-slate-200  lg:text-xl text-white"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <p className="text-2xl">{qty}</p>
                      <button
                        onClick={() => {
                          setQty(qty + 1);
                        }}
                        className=" bg-slate-700 space-x-2 px-3 py-2 rounded-full text-center hover:text-slate-900 hover:bg-slate-200  lg:text-xl text-white"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>

                    <button
                      onClick={async () => {
                        dispatch(addToCart({ item, qty }));
                        enqueueSnackbar("Product added to Cart!",{variant:"success"})
                      }}
                      className="lg:text-xl text-black bg-slate-50 lg:px-4 px-2 py-1 lg:py-2 mt-4 rounded-xl hover:bg-gray-950 hover:text-slate-50 duration-200"
                    >
                      <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="bg-slate-300 w-[100vw]  pb-16">
          <h1 className=" text-3xl lg:text-5xl font-light text-slate-950 text-center py-8 ">
            Related Products
          </h1>
          <div className="flex flex-wrap justify-center lg:space-x-16  lg:p-10">
            {relProd &&
              relProd.slice(0,4).map((prod) => (
                <div className="p-4">
                  <ProductCard product={prod} />
                </div>
              ))}
          </div>
        </div>


        <div className="bg-slate-200 h-[70vh]  text-black ">
          <h1 className=" text-3xl lg:text-5xl font-light text-slate-950 text-center  py-8 ">
            Write A Review
          </h1>
          <form
            action=""
            className="flex flex-row items-center justify-center md:space-x-16"
            onSubmit={submitHandler}
          >
            <div>
              <p className="text-xl lg:text-3xl font-light text-slate-950 text-center  py-4 ">
                Rating
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="1star"
                    value={1}
                    name="rating"
                    onChange={() => {
                      setrate(1);
                    }}
                  />
                  <label
                    htmlFor=""
                    className="text-base lg:text-2xl font-light text-slate-950 text-center  "
                  >
                    Inferior
                  </label>
                </div>
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="2star"
                    value={2}
                    name="rating"
                    onChange={() => {
                      setrate(2);
                    }}
                  />
                  <label
                    htmlFor=""
                    className="text-base lg:text-2xl font-light text-slate-950 text-center  "
                  >
                    Decent
                  </label>
                </div>
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="3star"
                    value={3}
                    name="rating"
                    onChange={() => {
                      setrate(3);
                    }}
                  />
                  <label
                    htmlFor=""
                    className="text-base lg:text-2xl font-light text-slate-950 text-center  "
                  >
                    Great
                  </label>
                </div>
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="4star"
                    value={4}
                    name="rating"
                    onChange={() => {
                      setrate(4);
                    }}
                  />
                  <label
                    htmlFor=""
                    className="text-base lg:text-2xl font-light text-slate-950 text-center  "
                  >
                    Excellent
                  </label>
                </div>
                <div className="flex space-x-2">
                  {" "}
                  <input
                    type="radio"
                    id="5star"
                    value={5}
                    name="rating"
                    onChange={() => {
                      setrate(5);
                    }}
                    className=""
                  />
                  <label
                    htmlFor=""
                    className="text-base lg:text-2xl font-light text-slate-950 text-center  "
                  >
                    Exceptional
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-xl md:text-3xl font-light text-black text-center  py-4 ">
                Review
              </p>
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="3"
                placeholder="Your Reviews"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className= "text-black text-base hover:text-white bg-slate-50 duration-200 shadow-xl hover:bg-gray-950 hover:shadow-slate-800 h-24  md:h-32 w-[60vw] lg:w-96 rounded-2xl text-center md:text-2xl items-center"
              ></textarea>
              <button
                type="submit"
                className="bg-slate-900 duration-200 text-white md:text-lg md:px-6 w-[20vw] lg:w-[10vw]  py-1 md:py-2 rounded-lg hover:bg-white border-2 hover:text-slate-700 font-semibold md:text-1xl border-slate-900 m-4 md:mx-32 shadow-xl hover:shadow-slate-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-gray-950">
        <h1 className="text-3xl md:text-5xl font-light text-slate-50 text-center justify-center flex flex-col  py-4 ">
          Product Reviews
        </h1>
       

        <div className="flex justify-center lg:p-16 flex-wrap items-center  ">
        {item && item.reviews && item.reviews.length===0 && 
          <p className="text-white text-2xl">No Reviews yet !</p> } 
          {item &&
            item.reviews &&
            item.reviews.slice(-5).map((prod) => (
              <div className="flex flex-col justify-center w-[80vw] md:w-[40vw] lg:w-[20vw] lg:h-[20vh] m-6 bg-slate-200 p-6 rounded-xl ">
                <div className="flex space-x-4">
                  <img
                    src={
                      "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043234-animal-avatar-bear-russian_113283.png"
                    }
                    alt="User-pic"
                    className="md:h-16 md:w-16 h-8 w-8 rounded-3xl object-contain"
                  />
                  <div className="flex flex-col">
                    <p className=" lg:text-lg font-semibold text-slate-700">
                      {prod.name}
                    </p>
                    <p className="text-sm lg:text-md font-semibold text-slate-600">
                      {prod.rating} Stars
                    </p>
                  </div>
                </div>
                <p className="lg:ml-20 text-sm ">{prod.comment.substring(0,80)}...</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;