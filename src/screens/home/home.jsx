import React, { useEffect, useState } from 'react'
import Banner from './banner/banner'
import Categories from './category/categories'
import Navbar from '../topNavbar/navbar'
import { getLocationDetails, getToken } from '../../utils/storage'
import Login from '../login/login'
import Location from '../landing/location'
import Seasnal from './seasnalProduct/seasnal'
import DailyFresh from './dailyFresh/dailyFresh'
import Combobag from './comboBag/combobag'
import CartButton from '../cart/cart_button'

const Home = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [locationVisible, setLocationVisible] = useState(false)
    const [location, setLocation] = useState()
    useEffect(() => {
        if (getToken() === null || undefined) {
            setLoginVisible(true)
        }
        if (getLocationDetails() === null || undefined ||[]) {
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
            <DailyFresh location={location}/>
            <Categories />
            <Combobag location={location}/>
            <Seasnal location={location}/>
            <CartButton/>
        </div>
    )
}

export default Home
