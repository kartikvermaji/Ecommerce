import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import TopProducts from '../Components/TopProducts';
import SpecialProducts from '../Components/SpecialProducts';
import ProductCarousal from '../Components/ProductCarousal';

const Home = () => {
    const user=useSelector((state)=>state.user);
  return (
    <div>
     
      <Hero/>
      <div className='bg-black'>
      <ProductCarousal/>
      <TopProducts/>
      <SpecialProducts/>
      <Navbar/>
      </div>
      
    </div>
  )
}

export default Home