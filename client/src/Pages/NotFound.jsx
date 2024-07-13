import  Navbar  from "../Components/Navbar"
import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center ">
      <Navbar/>
      <div className="flex justify-center py-10  items-center px-10">
        <div className="w-[35vw] ml-32">
            <img src="https://cdn.dribbble.com/userupload/8726277/file/still-90096ae0b20436af7d475737af5b86e5.gif?resize=400x0" alt=""  className="h-40"/>
            <h1 className="text-6xl font-extrabold text-sky-600">Page Not Found</h1>
            <p className="mt-4 w-[35vw]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </p>
            <button className="mt-4 border-2 border-black px-4 text-xl rounded-full py-2 hover:bg-sky-600 hover:text-slate-50 hover:border-sky-600 duration-200">Homepage</button>

        </div>
        <div className="">
            <img src="https://error404.fun/img/full-preview/2x/28.png" alt="" className="h-[80vh]  " />
        </div>
      </div>

    </div>
  )
}

export default NotFound