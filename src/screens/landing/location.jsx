import React, { useEffect, useState } from 'react';
import { farmsService } from '../../services/b2c_service';
import './location.css';
import { getLocationDetails, setLocationDetails } from '../../utils/storage';
import { Button } from '@mui/material';

const Location = ({ locations, handleClose }) => {
    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [error, setError] = useState('');

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
                                const locality = await fetchAddress(position.coords.latitude, position.coords.longitude);
                                if (hubList && locality) {
                                    handleLocation(hubList, locality);
                                }
                            }
                        },
                        (error) => {
                            setError("User Device Denied For Location");
                        }
                    );
                } else {
                    setError('Location Service is not supported by this browser.');
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
            } else {
                setError('Sorry We Cannot Fetch Your Location');
            }
        } catch (error) {
            setError('Error fetching address: ' + error.message);
        }
        return null;
    };

    const handleLocation = (hubList, locality) => {
        if (locality === 'Chennai') {
            const locationDetails = hubList.find((val) => val.farmName === locality);
            setLocationDetails(locationDetails);
            setSelectedLocation(locality);
            locations(locationDetails);
            handleClose();
            setError(null);
        } else {
            setError('Location Service is not Supported by This Device');
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
            locations(locationDetails);
            handleClose();
        } else {
            setError('Select your location');
        }
    };

    return error ? (
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
