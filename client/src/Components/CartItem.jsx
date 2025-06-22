import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../state/state";
import {
  faMinus,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartItem = ({ product }) => {
  const [qty, setQty] = useState(product.quantity);
  const obj = product.item;
  const dispatch = useDispatch();
  return (
    <div>
      {obj._id ? (
        <div className="flex justify-around space-x-1  items-center w-[95vw] lg:w-[80vw] my-10">
          <Link
            to={`/product/${product.item._id}`}
            className="flex  space-x-2 lg:space-x-10 justify-around items-center"
          >
            <img
              src={obj.image}
              alt={product.item.name}
              className="lg:h-32 md:h-24  h-16 lg:w-36 rounded-2xl object-contain hover:shadow-2xl hover:shadow-slate-500 hover:border-2"
            />
            <div className="lg:space-y-1 space-y-0">
              <p className="lg:text-2xl text-sm font-light md:w-[20vw]">{product.item.name}</p>
              <p className="lg:text-2xl text-sm font-semibold">${product.item.price}</p>
              <p className="lg:text-lg text-sm">Quantity: {product.quantity}</p>
            </div>
          </Link>

<div className="flex lg:text-5xl justify-center border-2 border-black lg:-4 lg:py-2 rounded-xl items-center px-2 py-1 space-x-2 lg:space-x-6">
          <button
            onClick={async () => {
              if (qty >= 1) {
                setQty(qty - 1);
                dispatch(addToCart({ item: obj, qty }));
              }
            }}
          >
            <FontAwesomeIcon
              icon={faMinus}
              className="text-black bg-white lg:text-2xl rounded-xl px-2 py-2 lg:px-4 lg:py-3 hover:bg-gray-950 hover:text-slate-50 duration-200 hover:shadow-2xl hover:shadow-slate-500"
            />
          </button>
          <div>{product.quantity}</div>
          <button
            onClick={async () => {
              setQty(qty + 1);
              dispatch(addToCart({ item: obj, qty }));
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="text-black bg-white lg:text-2xl rounded-xl px-2 py-2 lg:px-4 lg:py-3 hover:bg-gray-950 hover:text-slate-50 duration-200 hover:shadow-2xl hover:shadow-slate-500"
            />
          </button>
          </div>

          <div>
            <button
              onClick={() => {
                dispatch(removeFromCart({ item: obj, qty }));
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} className=" text-xl lg:text-4xl text-red-600 shadow-xl hover:shadow-red-500" />
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CartItem;