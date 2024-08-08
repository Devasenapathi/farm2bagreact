import React, { useEffect, useState } from 'react';
import { farmsService } from '../../services/b2c_service';
import './location.css';
import { setLocationDetails } from '../../utils/storage';

const Location = ({ locations, handleClose }) => {
    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
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
                                setError(error.message);
                            }
                        );
                    } else {
                        setError('Location is not supported by this browser.');
                    }
                } else {
                    console.log('Error on farms loading');
                }
            } catch (err) {
                console.log(err, 'error on farms');
            }
        };

        fetchFarmsAndLocation();
    }, []);

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
                setError('No locality found in address components.');
            } else {
                setError('No address found for the coordinates.');
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
            locations(locality);
            handleClose();
            setError(null);
        } else {
            setError('No Service is being provided in your location');
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
            locations(selectedLocation);
            handleClose();
        } else {
            setError('Select your location');
        }
    };

    return error ? (
        <div className='location-overlay'>
            <div className='location-content'>
                <h4 style={{ color: 'red' }}>{error}</h4>
                <label>Location</label>
                <select value={selectedLocation} className='location-select' onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option disabled value=''>Select your location</option>
                    {location.map((val) => (
                        <option key={val._id} value={val.farmName}>{val.farmName}</option>
                    ))}
                </select>
                <button onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    ) : null;
};

export default Location;
