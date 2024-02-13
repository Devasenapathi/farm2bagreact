import React, { useEffect, useState } from "react";
import { bannerService } from "../../../services/banner_service";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./banner.css";
const Banner = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    bannerService()
      .then((res) => {
        if (res.status === 201) {
          setBanner(res.data.result);
        } else {
          console.log("Banner loading error");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="banner_main">
      <Carousel
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        showThumbs={false}
      >
        {banner.map((val) => {
          return (
            <div key={val._id} className="banner_carousel">
              <img src={val.image} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
