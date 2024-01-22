import React, { useEffect, useState } from "react";
import Banner from "./banner/banner";
import Categories from "./category/categories";
import Navbar from "../topNavbar/navbar";
import {
  getCart,
  getLocationDetails,
  getToken,
  setProductList,
} from "../../utils/storage";
import Login from "../login/login";
import Location from "../landing/location";
import Seasnal from "./seasnalProduct/seasnal";
import DailyFresh from "./dailyFresh/dailyFresh";
import Combobag from "./comboBag/combobag";
import CartButton from "../cart/cart_button";
import { farmItemService } from "../../services/b2c_service";

const Home = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);
  const [location, setLocation] = useState();
  const [locationChanged, setLocationChanged] = useState(false);
  useEffect(() => {
    if (getToken() === null || undefined) {
      setLoginVisible(true);
    }
    if (getLocationDetails().length === 0) {
      setLocationVisible(true);
    } else {
      setLocation(getLocationDetails().farmName);
      const data = {
        lat: getLocationDetails() ? getLocationDetails().lattitude : "",
        lng: getLocationDetails() ? getLocationDetails().longitude : "",
        pincode: getLocationDetails() ? getLocationDetails().pincode : "",
      };
      farmItemService(data)
        .then((res) => {
          if (res.status === 200) {
            setProductList(res.data.result);
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
  }, [location]);

  const updateLocation = (value) => {
    setLocation(value);
  };
  return (
    <div>
      {locationVisible && (
        <Location
          locations={updateLocation}
          handleClose={() => {
            setLocationVisible(false);
          }}
        />
      )}
      {loginVisible && <Login handleClose={() => setLoginVisible(false)} />}
      <Navbar
        location={location}
        locationChanged={locationChanged}
        handleOpen={() => setLocationVisible(true)}
      />
      <Banner />
      <DailyFresh location={locationChanged} />
      <Categories />
      <Combobag location={locationChanged} />
      <Seasnal location={locationChanged} />
      {getCart().length > 0 && <CartButton />}
    </div>
  );
};

export default Home;
