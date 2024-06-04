import React, { useEffect, useState } from 'react'
import { farmsService } from '../../services/b2c_service'
import './location.css'
import { setLocationDetails } from '../../utils/storage'

const Location = ({ locations, handleClose }) => {
    const [location, setLocation] = useState([])
    const [selectedLocation, setSelectedLocation] = useState()
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        var hubList;
        farmsService().then((res) => {
            if (res.status === 200) {
                hubList = res.data.result;
                setLocation(res.data.result)
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setLatitude(position.coords.latitude);
                            setLongitude(position.coords.longitude);
                            setError(null);
                            if (position.coords) {
                                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDrxIN5pCE5TTrjdLWMq7VlMCxsj8FGD6k`)
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.results && data.results.length > 0) {
                                            const addressComponents = data.results[0].address_components;

                                            for (const component of addressComponents) {
                                                if (component.types.includes("locality")) {
                                                    const locality = component.long_name;
                                                    if (hubList && locality) {
                                                        handleLocation(hubList, locality)
                                                    }
                                                    break;
                                                }
                                            }
                                            // setError(null);
                                        } else {
                                            setError('No address found for the coordinates.');
                                        }
                                    })
                                    .catch(error => {
                                        setError('Error fetching address: ' + error.message);
                                    });
                            }
                        },
                        (error) => {
                            setError(error.message);
                        }
                    );
                } else {
                    setError('Location is not supported by this browser.');
                }
            } else {
                console.log("Error on farms loading");
            }
        }).catch((err) => { console.log(err, 'error on farms') })
    }, [])

    const handleLocation = (hubList, locality) => {
        if (locality === "Chennai") {
            const locationDetails = hubList.filter((val) => val.farmName === locality)
            setLocationDetails(locationDetails[0])
            setSelectedLocation(locality)
            locations(locality)
            handleClose()
            setError(null);
        } else {
            setError("No Service is been provided in your location")
        }
    }

    const handleSubmit = () => {
        const locationDetails = location.filter((val) => val.farmName === selectedLocation)
        setLocationDetails(locationDetails[0])
        locations(selectedLocation)
        handleClose()
    }

    return (
        error ? <div className='location-overlay' >
            <div className='location-content'>
                <h4 style={{color:"red"}}>{error}</h4>
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
        </div> : ''
    );
}

export default Location
