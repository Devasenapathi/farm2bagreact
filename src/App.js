import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/home/home";
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryItem />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/billing" element={<Billing />}></Route>
          <Route path="/product" element={<SingleProduct />}></Route>
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
      </Router>
    </div>
  );
}

export default App;
