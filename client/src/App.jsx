import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProductInfo from "./Pages/ProductInfo";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import Shipping from "./Pages/Shipping";
import PlaceOrder from "./Pages/PlaceOrder";
import Profile from "./Pages/Profile";
import Order from "./Pages/Order";
import Favourite from "./Pages/Favourite";
import UserList from "./Pages/Admin/UserList";
import Category from "./Pages/Admin/Category";
import NewProduct from "./Pages/Admin/NewProduct";
import AllProduct from "./Pages/Admin/AllProduct";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Navbar  from "./Components/Navbar";
import Nav2  from "./Components/Nav2";
import NotFound from "./Pages/NotFound";
import Orders from "./Pages/Admin/Orders";




export default function App() {
  const user=useSelector((state)=>state.user);
 
  return (
    <div>
      <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/fav" element={<Favourite/> }/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductInfo/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/placeorder" element={<PlaceOrder/>}/>
        <Route path="/profile" element={<Profile/>}/> 
        <Route path="/order/:id" element={<Order/>}/> 


        <Route path="*" element={<NotFound/> } />
        <Route path="/userlist"  element={<UserList/> } />
        <Route path="/categories" element={<Category/> } />
        <Route path="/addproduct" element={<NewProduct/>} />
        <Route path="/allproducts" element={<AllProduct/>} />
        <Route path="/updateproduct/:id" element={<UpdateProduct/> } />
        <Route path="/orders" element={<Orders/> } />
      </Routes>
    
      {user && user.isAdmin &&  <Nav2/>}
     
      </BrowserRouter>
    </div>
  )
}