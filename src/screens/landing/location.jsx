import React, { useEffect, useState, useMemo } from 'react';
import { farmsService } from '../../services/b2c_service';
import './location.css';
import { setLocationDetails } from '../../utils/storage';
import { Button } from '@mui/material';

const Location = ({ locations, handleClose }) => {
    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [error, setError] = useState('');

    // Fetch farms and location data on component mount
    useEffect(() => {
        fetchFarmsAndLocation();
    }, []);

    // Fetch farm and location data asynchronously
    const fetchFarmsAndLocation = async () => {
        try {
            const res = await farmsService();
            if (res.status === 200) {
                const hubList = res.data.result;
                setLocation(hubList);

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            if (position.coords) {
                                const locality = await fetchAddress(position.coords.latitude, position.coords.longitude);
                                if (locality) {
                                    handleLocation(hubList, locality);
                                }
                            }
                        },
                        (error) => {
                            setError('User denied location access.');
                        }
                    );
                } else {
                    setError('Location services not supported by this browser.');
                }
            } else {
                console.error('Error loading farms');
            }
        } catch (err) {
            console.error('Error fetching farms:', err);
            setError('Failed to load farm data.');
        }
    };

    // Fetch address from Google Maps API using latitude and longitude
    const fetchAddress = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
            );
            const data = await response.json();

            if (data.results.length > 0) {
                const locality = data.results[0].address_components.find(component =>
                    component.types.includes('locality')
                );
                return locality?.long_name || null;
            } else {
                setError('Unable to retrieve location details.');
            }
        } catch (error) {
            setError('Error fetching address: ' + error.message);
        }
        return null;
    };

    // Handle location logic when user position is available
    const handleLocation = (hubList, locality) => {
        const locationDetails = hubList.find((val) => val.farmName === locality);

        if (locationDetails) {
            setLocationDetails(locationDetails);
            setSelectedLocation(locality);
            locations(locationDetails);
            handleClose();
            setError(null);
        } else {
            setError('Location not supported.');
        }
    };

    // Handle location submit button click
    const handleSubmit = () => {
        if (selectedLocation) {
            const locationDetails = location.find((val) => val.farmName === selectedLocation);
            if (locationDetails) {
                setLocationDetails(locationDetails);
                locations(locationDetails);
                handleClose();
            }
        } else {
            setError('Please select a location.');
        }
    };

    // Memoize location options to prevent unnecessary re-renders
    const locationOptions = useMemo(() => (
        location.map((val) => (
            <option key={val._id} value={val.farmName}>{val.farmName}</option>
        ))
    ), [location]);

    return error ? (
        <div className="location-overlay">
            <div className="location-content">
                <label>Location</label>
                <p style={{ color: 'red' }}>{error}</p>
                <select
                    value={selectedLocation}
                    className="location-select"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option disabled value="">Select your location</option>
                    {locationOptions}
                </select>
                <Button variant="contained" color="success" onClick={handleSubmit}>
                    Confirm
                </Button>
            </div>
        </div>
    ) : null;
};

export default Location;