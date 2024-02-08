import React, { useEffect, useState } from "react";
import { categoryService } from "../../../services/b2c_service";
import "./categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    categoryService()
      .then((res) => {
        if (res.status === 201) {
          setCategory(res.data.result);
        } else {
          console.log("Error in Category loading");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <section className="categories" id="categories">
      <h1 className="heading">
        products <span>categories</span>
      </h1>
      <div className="box-container">
        {category.map((val) => {
          return (
            <div key={val._id}>
              <Link to={"/category"} state={val}>
                <div className="box">
                  <img src={val.image} alt="" className="box-image" />
                  <h5>{val.categoryName}</h5>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
