import React from "react";
import heroImage from "../assets/hero2.png";
import Navbar from "./Navbar";
import { motion, useTransform, useViewportScroll } from "framer-motion";

const Hero = () => {
  const { scrollYProgress } = useViewportScroll()
  const scale = useTransform(scrollYProgress, [1.5, 0], [0.2, 1 ]);
  return (
    <div className="bg-black">
      <motion.img
      style={{ scale }}
        src="https://w0.peakpx.com/wallpaper/601/760/HD-wallpaper-apple-macbook-laptop-on-black-background-modern-technology-laptop-apple-thumbnail.jpg"
        alt=""
        className="w-[100vw] h-[100vh] object-cover absolute md:rounded-2xl"
      />
      <motion.div
      style={{ scale }}
       className="relative  items-center flex flex-col justify-center ">
        <div className="flex flex-col  md:flex-row bg-transparent/50 items-center   justify-center pt-1 md:pt-16 h-[100vh] w-[100vw]">
          <div className="md:pt-4 pl-2 md:pl-0 md:w-[50vw]">
            <motion.h1
             initial={{ opacity: 0, y: 50 }}
             whileInView={{
               opacity: 1,
               y: 0,
               transition: { delay: 0, duration: 1 },
             }}
             viewport={{ once: true, amount: 0.5 }}
             className="lg:text-xl font-semibold font-sans text-slate-100 mt-28 md:mt-20">
              Latest Collections
            </motion.h1>

            <motion.h1
             initial={{ opacity: 0, y: 50 }}
             whileInView={{
               opacity: 1,
               y: 0,
               transition: { delay: 0.15, duration: 1 },
             }}
             viewport={{ once: true, amount: 0.5 }}
             className="lg:text-8xl md:text-5xl text-4xl font-sans gradient-text text-transparent  bg-gradient-to-r from-blue-600 to-blue-50 font-extrabold bg-clip-text">
              Your's Choices
            </motion.h1>

            <motion.h1 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{
               opacity: 1,
               y: 0,
               transition: { delay:0.25, duration: 1 },
             }}
             viewport={{ once: true, amount: 0.5 }}
            className="lg:text-8xl md:text-5xl text-4xl  font-sans gradient-text text-transparent  bg-gradient-to-r from-sky-500 to-sky-50 font-extrabold bg-clip-text pl-16 md:pl-14 lg:pl-32">
              Our Priorities
            </motion.h1>

            <motion.p 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{
               opacity: 1,
               y: 0,
               transition: { delay: 0.15, duration: 1 },
             }}
             viewport={{ once: true, amount: 0.5 }}
            className="md:text-xl md:mt-5 mt-3 font-semibold text-slate-100">
              "Get all the latest technolgies with greatest Deals"
            </motion.p>

            <motion.p
             initial={{ opacity: 0, y: 50 }}
             whileInView={{
               opacity: 1,
               y: 0,
               transition: { delay: 0.25, duration: 1 },
             }}
             viewport={{ once: true, amount: 0.5 }}
             className="md:text-xl md:mt-2 font-semibold text-white pl-[2rem]">
              -Market
            </motion.p>
            <div className=" md:mt-10 md:ml-20 lg:ml-32 mt-4 ml-6 flex space-x-8">
              <motion.button
               initial={{ opacity: 0, y: 50 }}
               whileInView={{
                 opacity: 1,
                 y: 0,
                 transition: { delay: 0.15, duration: 1 },
               }}
               viewport={{ once: true, amount: 0.5 }}
               className="duration-200 bg-black text-slate-50 text-lg lg:px-8 px-4  lg:py-2 rounded-lg hover:bg-transparent border-slate-950 border-2 hover:text-slate-950 font-semibold lg:text-3xl ">
                Shop
              </motion.button>

              <motion.button
              
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: .25, duration:1 },
              }}
              viewport={{ once: true, amount: 0.5 }}className="duration-200 lg:text-3xl text-lg text-black border-slate-950 border-2 hover:bg-black font-semibold hover:text-slate-50 px-4 lg:px-8 py-2 rounded-lg">
                Cart
              </motion.button>
            </div>

            {/* <p className=' md:mt-10 mt-4 md:text-xl font-semibold text-slate-700'>Our Collections:</p> */}
          </div>
          <div className="md:h-[90vh] md:w-[40vw] md:mt-16 lg:mt-5  h-[70vh] mt-5 ">
            <div className="flex flex-col">
              <div className="flex ">

                <motion.img
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{
                   opacity: 1,
                   y: 0,
                   transition: { delay: 0, duration: 1 },
                 }}
                 viewport={{ once: true, amount: 0.5 }}
                  src="https://m.media-amazon.com/images/I/517lSvEVVsL._SX522_.jpg"
                  alt=""
                  className="lg:h-[25rem] md:h-[18rem]  h-[8rem] w-[14rem] lg:w-[27rem] object-cover rounded-[5vw] m-2"
                />
                <motion.img
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{
                   opacity: 1,
                   y: 0,
                   transition: { delay: .15, duration: 1.2 },
                 }}
                 viewport={{ once: true, amount: 0.5 }}
                  src="https://m.media-amazon.com/images/I/61JtVmcxb0L._AC_UL320_.jpg"
                  alt=""
                  className="lg:h-[25rem] md:h-[18rem] h-[8rem] w-[4rem] lg:w-[10rem] object-cover rounded-full m-2"
                />
              </div>
              <div className="flex">
                <motion.img
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{
                   opacity: 1,
                   y: 0,
                   transition: { delay:.25, duration: 1 },
                 }}
                 viewport={{ once: true, amount: 0.5 }}
                  src="https://m.media-amazon.com/images/I/61RuJVn92GL._AC_UL320_.jpg"
                  alt=""
                  className="lg:h-[10rem] md:h-[5rem] h-[3rem] w-[14rem]  lg:w-[30rem]  object-cover rounded-full m-2"
                />

                <motion.img
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{
                   opacity: 1,
                   y: 0,
                   transition: { delay: .1, duration: 1 },
                 }}
                 viewport={{ once: true, amount: 0.5 }}
                  src="https://m.media-amazon.com/images/I/31uLEZHhMDL._SX300_SY300_QL70_FMwebp_.jpg"
                  alt=""
                  className=" m-2 lg:h-[10rem] md:h-[4rem] md:w-[4rem] h-[3rem] w-[3rem] lg:w-[10rem] object-cover rounded-full "
                />
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </motion.div>
      
    </div>
  );
};

export default Hero;