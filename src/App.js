import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./newScreens/Home/Home";
import CategoryItem from "./screens/categoryItems/categoryItem";
import Checkout from "./screens/checkout/checkout";
import Billing from "./screens/billing/billing";
import SingleProduct from "./screens/singleProduct/singleProduct";
import Profile from "./screens/profile/profile";
import LastOrders from "./screens/orders/lastOrders";
import Terms from "./screens/termsOfUse/terms";
import PrivacyPolicy from "./screens/privacyPolicy/privacyPolicy";
import Aboutus from "./screens/aboutUs/aboutUs";
import Orders from "./screens/profile/orders/orders";
import Wallet from "./screens/profile/wallet/wallet";
import Address from "./screens/profile/address/address";
import ProfileDetails from "./screens/profile/profileDetails/profileDetails";
import CustomerSupport from "./screens/profile/customerSupport/customerSupport";
import Category from "./newScreens/Category/Category";
import Navbar from "./newScreens/Home/Navbar/Navbar";
import FooterScreen from "./screens/home/footer/footer";
import Location from "./screens/landing/location";
import { useEffect, useState } from "react";
import { farmItemService } from "./services/b2c_service";
import { getLocationDetails, setProductList } from "./utils/storage";
import { UserProvider } from "./helpers/createContext";

function App() {
  const [locationVisible, setLocationVisible] = useState(false);
  const [location, setLocation] = useState([]);
  const [locationChanged, setLocationChanged] = useState()

  const updateLocation = (value) => {
    setLocation(value);
  };

  useEffect(()=>{
    if(getLocationDetails().length <=0){
      setLocationVisible(true)
    }
    if(location){
      const data = {
        lat: location?location.lattitude : "",
        lng: location?location.longitude : "",
        pincode: location?location.pincode : "",
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
  },[location])

  return (
    <div className="App">
      <UserProvider>
      {locationVisible && (
        <Location
          locations={updateLocation}
          handleClose={() => {
            setLocationVisible(false);
          }}
        />
      )}
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/billing" element={<Billing />}></Route>
          <Route path="/product/:id" element={<SingleProduct />}></Route>
          <Route path="/profile" element={<Profile />}>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="wallet" element={<Wallet />}></Route>
            <Route path="address" element={<Address />}></Route>
            <Route path="profile" element={<ProfileDetails />}></Route>
            <Route path="customer" element={<CustomerSupport />}></Route>
          </Route>
          <Route path="/orders" element={<LastOrders />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/privacy" element={<PrivacyPolicy />}></Route>
          <Route path="/aboutus" element={<Aboutus />}></Route>
          <Route path="/previous_orders" element={<Orders />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/addresses" element={<Address />} />
          <Route path="/profileDetails" element={<ProfileDetails />}></Route>
          <Route path="/customer" element={<CustomerSupport />}></Route>
        </Routes>
        <FooterScreen/>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
