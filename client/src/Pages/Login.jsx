import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../state/state";
import axios from "axios";
import Navbar from "../Components/Navbar";
import LoginImage from "../assets/loginimage.jpg";
import RegisterImage from '../assets/registerimage.png'
import { useSnackbar} from 'notistack'

const Login = () => {
  const [account, setaccount] = useState(true);
  const handleclick = async () => {
    setaccount(!account);
  };
  return (
    <div>
      <Navbar />
      <div className="pt-16 bg-slate-200 text-white">
        {account ? (
          <div className="flex flex-col">
            <SiginIn handleclick={handleclick}/>
            
          </div>
        ) : (
          <div>
            <SignUp  handleclick={handleclick}/>
            
          </div>
        )}
      </div>
    </div>
  );
};

const SignUp = ({handleclick}) => {
  const {enqueueSnackbar}=useSnackbar();
  const [formData, setFormDate] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleChange = (e) => {
    setFormDate((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );
      enqueueSnackbar("User Registered Successfully!",{variant:"success"})
    } catch (err) {
      enqueueSnackbar("User Already Exists",{variant:"error"})
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around min-h-[100vh] ">
        <div>
        <img src={RegisterImage} alt="" className="w-[98vw] pl-1 mt-[-5vh] md:mt-0 md:pl-0 md:w-[55vw] md:h-[90vh] h-[25vh] rounded-3xl object-cover shadow-2xl " />
        </div>
      <div className=" md:mt-6 flex flex-col items-end">
      <h1 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-600 p-3 ">Market</h1>
        <h1 className="text-6xl md:p-3 text-slate-950 font-extrabold text-center ">Register</h1>
      <form action="" onSubmit={handleSubmit}  className=" flex flex-col justify- items-start w-[95vw]   md:w-[30vw] p-3">
      <label htmlFor="username" className="text-slate-500 text-xl text-left   font-semibold ml-4">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="bg-white border-2 w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center text-xl px-10 py-2 rounded-full  p-3"
        />
          <label htmlFor="username" className="text-slate-500 text-xl text-left mt-5   font-semibold ml-4">Email</label>
        <input
          type="email"
          placeholder="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-white border-2 w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center text-xl px-10 py-2 rounded-full  p-3"
        />
          <label htmlFor="username" className="text-slate-500 text-xl text-left mt-5   font-semibold ml-4">Password</label>
        <input
          type="text"
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-white border-2 w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center text-xl px-10 py-2 rounded-full  p-3"
        />
        <button type="submit"  className="bg-slate-50 text-lg md:text-xl w-[6vw] ml-40 text-black mt-4 py-1 md:py-1 rounded-2xl hover:bg-gray-950 duration-300 border-2 hover:text-slate-50">Register</button>
      </form>
      <p onClick={handleclick} className="  text-slate-950 sm:text-lg mr-32 pl-2">Already have an account?<span className="text-slate-700 duration-200 font-semibold hover:text-slate-500"> Login here</span></p>
        </div>
      
    </div>
  );
};



const SiginIn = ({handleclick}) => {
  const {enqueueSnackbar}=useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormDate] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormDate((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        formData
      );
      dispatch(
        setLogin({
          user: response.data.user,
          token: response.data.token,
        })
      );
      navigate("/home");
      enqueueSnackbar("Logged in Successfully!",{variant:"success"})
    } catch (err) {
      enqueueSnackbar("Incorrect Credentials",{variant:"error"})
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around min-h-[100vh] ">
       <div>
        <img src={LoginImage} alt="" className="w-[98vw] pl-1 mt-[-5vh] md:hidden md:pl-0 md:w-[55vw] md:h-[90vh] h-[25vh] rounded-3xl object-cover shadow-2xl " />
      </div>
      <div className="mt-[-10vh] md:mt-6 ">
        <h1 className="text-xl md:text-2xl font-sans font-extrabold text-slate-700 ml-10 nd:p-3 md:p-2 mt-4">Market</h1>
        <h1 className= "text-5xl md:text-6xl  md:p-3 text-black font-extrabold text-left ml-10 mt-2 md:mt-0">Login</h1>
        <form action="" onSubmit={handleSubmit} className=" flex flex-col items-left ml-5 md:ml-10 justify-start w-[95vw] md:w-[30vw] p-3">
          <label htmlFor="username" className="text-slate-500 md:text-xl text-left font-semibold ml-4">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-slate-50 border-2 w-[80vw] md:w-[34vw] lg:w-[28vw] text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center text-xl px-10 py-1  lg:py-2 rounded-full  lg:p-3"
          />
          <label htmlFor="password" className="text-slate-500 md:text-xl text-left font-semibold ml-4 mt-5">Password</label>
          <input
            type="text"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-slate-50 border-2 w-[80vw] md:w-[34vw] lg:w-[28vw]  text-slate-950 hover:bg-black hover:text-slate-50 duration-200 text-center text-xl px-10 py-1 lg:py-2 rounded-full  lg:p-3"
          />
          <button type="submit" className="bg-slate-50  text-lg md:text-xl w-[28vw] md:w-[15vw]  lg:w-[6vw] text-black mt-4 ml-20 md:ml-10 lg:ml-40 hover:shadow-2xl hover:shadow-slate-800 py-1 md:py-1 rounded-2xl hover:bg-gray-950 duration-300 border-2 hover:text-slate-50">Login</button>
        </form>
        <p onClick={handleclick} className="lg:ml-16 ml-4 sm:text-lg pl-2 text-slate-950 ">Don't have any account?<span className="text-slate-700 font-semibold hover:text-slate-400"> Regsiter Here</span></p>
      </div>
      <div>
        <img src={LoginImage} alt="" className=" hidden md:block w-[95vw] pl-3 md:pl-0 md:w-[55vw] md:h-[90vh] h-[25vh] rounded-3xl object-cover shadow-2xl " />
      </div>
    </div>
  );
};

export default Login;