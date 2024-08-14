import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import Banner from './Banner/Banner'
import Body from './Body/Body'
import './Home.css'
import { getProductList } from '../../utils/storage'

const Home = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div className='newHome'>
        {/* <Navbar/> */}
        {getProductList()&&
        <div>
        <Banner/>
        <Body/>
        
        </div>}
        {/* <Category/> */}
    </div>
  )
}

export default Home