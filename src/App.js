import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/orders" element={<LastOrders />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/privacy" element={<PrivacyPolicy />}></Route>
          <Route path="/aboutus" element={<Aboutus />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
