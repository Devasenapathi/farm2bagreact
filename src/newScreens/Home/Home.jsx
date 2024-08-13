import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import Banner from './Banner/Banner'
import Body from './Body/Body'
import Location from '../../screens/landing/location'
import './Home.css'
const Home = () => {
  const [location, setLocation] = useState();
  const updateLocation = (value) => {
    setLocation(value);
  };
  return (
    <div className='newHome'>
        <Location locations={updateLocation}
          handleClose={() => {console.log('aaaaaaaaaaaaaa')
          }}/>
        <Navbar/>
        <Banner/>
        <Body/>
    </div>
  )
}

export default Home