import React from "react";
import useScrollToTop from "../../helpers/useScrollToTop";

const Aboutus = () => {
  useScrollToTop()
  return (
    <div className="terms-container">
      <div>
        <div>
          <h3 style={{ "text-align": "center" }}>About Us</h3>
          <h4>What is farm2bag.com?</h4>
          <p>
            Farm2bag.com (SHINELOGICS INFOTECH Private Limited) is to show FARM
            Products ONLINE and for connecting Organic Farmers and consumers.
            With over 10,000 +products and over a 1000 Farmers in farms, we
            provide you Fresh Fruits and Vegetables, Rice and Dals, Spices and
            all organic Products. Place an order in Farm2bag.com and your order
            will be delivered right to your doorstep, anywhere In Tamilnadu and
            PAN INDIA soon , You can pay online using your debit / credit card
            or by cash on delivery. We guarantee on time delivery, and the best
            quality!
          </p>

          <h4>Why should I use Farm2 bag ?</h4>

          <p>
            Farm2bag.com allows you to walk away from the drudgery of grocery
            shopping and welcome an easy relaxed way of browsing and shopping
            for groceries. No more getting stuck in traffic jams, paying for
            parking, standing in long queues and carrying heavy bags – get
            everything you need, when you need , right at your doorstep. Food
            shopping online is now easy as every product on your monthly
            shopping list, is now available online farm2bag.com
          </p>

          <h4>How do I order?</h4>

          <div className="my-account-wrap p-0">
            <div className="login-wrapper pr-50">
              <h5>
                Browse Farm2Bag.com and search products by selecting your
                location
              </h5>
              {/* <img src="assets/images/about-us/home.png" style="width:100%;"> */}
            </div>
            <div className="login-wrapper pr-50">
              <h5>
                Add products to your shopping bag selected under particular farm
              </h5>
              {/* <img src="assets/images/about-us/products.png" style="width: 90%;"> */}
            </div>
          </div>
          <div className="my-account-wrap p-0" style={{"margin-top ":"30px"}}>
            <div className="login-wrapper pr-50">
              <h5>
                Choose your convenient delivery options available such as Farm
                pickup, Location pickup, Door delivery
              </h5>
              {/* <img src="assets/images/about-us/checkout.png" style="width: 100%;"> */}
            </div>
            <div className="login-wrapper pr-50">
              <h5>
                Select your suitable payment option(Net banking, Credit card,
                Cash on delivery)
              </h5>
              {/* <img src="assets/images/about-us/payment.png" style="width: 100%;margin-top: 30px;"> */}
            </div>
          </div>
          <div className="my-account-wrap p-0">
            <div className="login-wrapper pr-50">
              <h5>Your products will be delivered accordingly</h5>
              {/* <img src="assets/images/about-us/bag.png" style="width:70%"> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
