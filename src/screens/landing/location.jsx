import React, { useEffect, useState } from 'react'
import { farmsService } from '../../services/b2c_service'
import './location.css'
import { setLocationDetails } from '../../utils/storage'

const Location = ({ locations, handleClose }) => {
    const [location, setLocation] = useState([])
    const [selectedLocation, setSelectedLocation] = useState()
    useEffect(() => {
        farmsService().then((res) => {
            if (res.status === 200) {
                setLocation(res.data.result)
            } else {
                console.log("Error on farms loading");
            }
        }).catch((err) => { console.log(err, 'error on farms') })
    }, [])
    const handleSubmit = () => {
        handleClose()
        const locationDetails = location.filter((val)=>val.farmName === selectedLocation)
        setLocationDetails(locationDetails[0])
        locations(selectedLocation)
    }
    return (
        (<div className='location-overlay'>
            <div className='location-content'>
                <label>Location</label>
                <select value={selectedLocation} className='location-select' onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option>select your location</option>
                    {location.map((val) => {
                        return (
                            <option key={val._id} value={val.farmName}>{val.farmName}</option>
                        )
                    }
                    )}
                </select>
                <button onClick={handleSubmit}>confirm</button>
            </div>
        </div>)
    );
}

export default Location
