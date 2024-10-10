import React, { useContext, useEffect, useState } from 'react';
import { farmItemService, farmsService } from '../../services/b2c_service';
import './location.css';
import { getLocationDetails, setLocationDetails, setProductList, setUserLocation } from '../../utils/storage';
import { Button } from '@mui/material';
import { ProductContext } from '../../helpers/createContext';

const Location = () => {
    const { setProductLists } = useContext(ProductContext)
    const [location, setLocation] = useState([]);
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('');
    const [error, setError] = useState('');
    const [locationVisible, setLocationVisible] = useState(false);
    const [locationChanged, setLocationChanged] = useState()


    useEffect(() => {
        fetchFarmsAndLocation();
    }, []);

    const fetchFarmsAndLocation = async () => {
        try {
            const res = await farmsService();
            if (res.status === 200) {
                const hubList = res.data.result;
                setLocation(hubList);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            setError(null);
                            if (position.coords) {
                                setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                                const locality = await fetchAddress(position.coords.latitude, position.coords.longitude);
                                if (hubList && locality) {
                                    handleLocation(hubList, locality);
                                }
                            }
                        },
                        (error) => {
                            setError("User Device Denied For Location");
                            setLocationVisible(true)

                        }
                    );
                } else {
                    setError('Location Service is not supported by this browser.');
                    setLocationVisible(true)
                }
            } else {
                console.log('Error on farms loading');
            }
        } catch (err) {
            console.log(err, 'error on farms');
        }
    };


    const fetchAddress = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDrxIN5pCE5TTrjdLWMq7VlMCxsj8FGD6k`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                for (const component of addressComponents) {
                    if (component.types.includes('locality')) {
                        return component.long_name;
                    }
                }
                setError('Sorry We Cannot Fetch Your Location');
                setLocationVisible(true)

            } else {
                setError('Sorry We Cannot Fetch Your Location');
                setLocationVisible(true)

            }
        } catch (error) {
            setError('Error fetching address: ' + error.message);
            setLocationVisible(true)

        }
        return null;
    };

    const handleLocation = (hubList, locality) => {
        if (locality === 'Chennai') {
            const locationDetails = hubList.find((val) => val.farmName === locality);
            setLocationDetails(locationDetails);
            setSelectedLocation(locality);
            setLocations(locationDetails);
            setLocationVisible(false);
            setError(null);
        } else {
            setError('Location Service is not Supported by This Device');
            setLocationVisible(true)
        }
    };

    useEffect(() => {
        if (selectedLocation) {
            setError('Thanks for providing your location');
        }
    }, [selectedLocation]);

    const handleSubmit = () => {
        if (selectedLocation) {
            const locationDetails = location.find((val) => val.farmName === selectedLocation);
            setLocationDetails(locationDetails);
            setLocations(locationDetails);
            setLocationVisible(false);
        } else {
            setError('Select your location');
            setLocationVisible(true)

        }
    };

    useEffect(() => {
        if (location) {
            const data = {
                lat: locations ? locations.lattitude : "",
                lng: locations ? locations.longitude : "",
                pincode: locations ? locations.pincode : "",
            };
            farmItemService(data)
                .then((res) => {
                    if (res.status === 200) {
                        setProductList(res.data.result);
                        setProductLists(res.data.result)
                        if (locationChanged === true) {
                            setLocationChanged(false);
                        } else {
                            setLocationChanged(true);
                        }
                    } else {
                        console.log("Error on getting farmItem");
                    }
                })
                .catch((err) => {
                    console.log(err, "error on seasnol product fetching");
                });
        }
    }, [locations])

    return locationVisible ? (
        <div className='location-overlay'>
            <div className='location-content'>
                <label>Location</label>
                <p style={{ color: 'red' }}>{error}</p>
                <select value={selectedLocation} className='location-select' onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option disabled value=''>Select your location</option>
                    {location.map((val) => (
                        <option key={val._id} value={val.farmName}>{val.farmName}</option>
                    ))}
                </select>
                <Button variant='contained' color='success' onClick={handleSubmit}>Confirm</Button>
            </div>
        </div>
    ) : null;
};

export default Location;
