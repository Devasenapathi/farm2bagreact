import React, { useEffect, useState } from 'react'
import Banner from './banner/banner'
import Categories from './category/categories'
import Navbar from '../topNavbar/navbar'
import { getLocationDetails, getToken } from '../../utils/storage'
import Login from '../login/login'
import Location from '../landing/location'
import Seasnal from './seasnalProduct/seasnal'

const Home = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [locationVisible, setLocationVisible] = useState(false)
    const [location, setLocation] = useState()
    useEffect(() => {
        if (getToken() === null || undefined) {
            setLoginVisible(true)
        }
        if (getLocationDetails() === null || undefined) {
            setLocationVisible(true)
        }
    }, [])

    const updateLocation = (value) => {
        setLocation(value)
    }
    return (
        <div>
            {locationVisible && <Location locations={updateLocation} handleClose={() => { setLocationVisible(false) }} />}
            {loginVisible && <Login handleClose={() => setLoginVisible(false)} />}
            <Navbar location={location} handleOpen={() => setLocationVisible(true)} />
            <Banner />
            <Categories />
            <Seasnal location={location}/>
        </div>
    )
}

export default Home
