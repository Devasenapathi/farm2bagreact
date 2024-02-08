import React, { useEffect, useState } from "react";
import Banner from "./banner/banner";
import Categories from "./category/categories";
import Navbar from "../topNavbar/navbar";
import {
  getLocationDetails,
  setProductList,
} from "../../utils/storage";
import Location from "../landing/location";
import Seasnal from "./seasnalProduct/seasnal";
import DailyFresh from "./dailyFresh/dailyFresh";
import Combobag from "./comboBag/combobag";
import CartButton from "../cart/cart_button";
import { farmItemService } from "../../services/b2c_service";
import FooterScreen from "./footer/footer";
import Instant from "./instantDelivery.jsx/instant";

const Home = () => {
  const [locationVisible, setLocationVisible] = useState(false);
  const [location, setLocation] = useState();
  const [locationChanged, setLocationChanged] = useState(false);
  useEffect(() => {
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
      <CartButton />
      {locationVisible && (
        <Location
          locations={updateLocation}
          handleClose={() => {
            setLocationVisible(false);
          }}
        />
      )}
      <Navbar
        location={location}
        locationChanged={locationChanged}
        handleOpen={() => setLocationVisible(true)}
      />
      {/* <Instant/> */}
      <Banner />
      <div className="">
        <DailyFresh location={locationChanged} />
        <Categories />
        <Combobag location={locationChanged} />
        <Seasnal location={locationChanged} />
        <FooterScreen />
      </div>
    </div>
  );
};

export default Home;
