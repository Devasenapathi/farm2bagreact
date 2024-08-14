import React, { useEffect, useState } from "react";
import { categoryService } from "../../services/b2c_service";
import { getCart, getProductList } from "../../utils/storage";
import { AddCart, RemoveCart } from "../../services/cart_service";
// import CartButton from "../cart/cart_button";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { categoryService } from '../../../services/b2c_service';
// import { getProductList } from '../../../utils/storage';
import { FaRegHeart } from "react-icons/fa";

import "./Category.css";
import { Divider } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [farmItem, setFarmItem] = useState([]);
  const [cartData, setCartData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedCategory(location.state);
    categoryService()
      .then((res) => {
        if (res.status === 201) {
          setCategory(res.data.result);
        } else {
          console.log("Error in Category loading");
        }
      })
      .catch((err) => console.log(err));
  },[]);

  useEffect(() => {
    setCartData(getCart());

    setFarmItem(
      selectedCategory
        ? getProductList().filter(
            (data) => data.productCategoryId._id === selectedCategory._id
          )
        : getProductList().filter(
            (data) => data.productCategoryId._id === location.state
          )
    );
  }, [selectedCategory]);

  const Add = (data) => {
    const value = AddCart(data);
    if (value) {
      setCartData(getCart());
    }
  };
  const Remove = (data) => {
    const value = RemoveCart(data);
    if (value) {
      setCartData(getCart());
    }
  };

  const handleRouting = (data) => {
    navigate(`/product/${data._id}`, { state: data });
  };
  return (
    <div className="newCategory">
      <div className="newCategoryLeft">
        {selectedCategory && (
          <IoMdArrowRoundBack onClick={() => navigate(-1)} size={30} />
        )}
        <div className="newCategoryLeft1">
          {category.map((val, index) => {
            return (
              <div
                className="newCategoryType"
                style={{
                  backgroundColor:
                    selectedCategory._id === val._id ? "#408140" : "",
                }}
                onClick={() => {
                  setSelectedCategory(val);
                }}
                key={index}
              >
                <CardMedia
                  sx={{ height: 50, width: 50 }}
                  image={val.image}
                  title="green iguana"
                />
                {val.categoryName}
              </div>
            );
          })}
        </div>
      </div>
      <div className="newCategoryRight">
        <h1>{selectedCategory && selectedCategory.categoryName}</h1>
        <Box sx={{ flexGrow: 1, mt: 4, mr: 2, ml: 2 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 0 }}
            columns={{ xs: 2, sm: 8, md: 16 }}
          >
            {farmItem
              ? farmItem.map((val, index) => {
                  return (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <Card
                        onClick={() => handleRouting(val)} // Handle card click
                        sx={{
                          minWidth: 200,
                          minHeight: 320,
                          mb: 1,
                          mr: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          cursor: "pointer", // Add cursor pointer to indicate that the card is clickable
                        }}
                      >
                        <CardMedia
                          sx={{ height: 150 }}
                          image={val.image}
                          title="Product Image"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="body2">
                            {val.productName}
                          </Typography>
                          <Typography variant="caption" color="green">
                            {val.productTypeMasterId.productType}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {val.unit} {val.unitValue} - ₹{val.price}
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            zIndex: 1000,
                            p: 1, // Add padding to CardActions for better spacing
                          }}
                        >
                          <Button size="small" variant="text" color="success">
                            <FaRegHeart size={20} />
                          </Button>
                          {cartData.find((item) => item._id === val._id)
                            ?.quantity > 0 ? (
                            <div
                              className="cart-button"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  Remove(val);
                                }}
                              >
                                -
                              </Button>
                              <Typography variant="h6" sx={{ mx: 1 }}>
                                {
                                  cartData.find((item) => item._id === val._id)
                                    ?.quantity
                                }
                              </Typography>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  Add(val);
                                }}
                              >
                                +
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent click event on button from triggering card's onClick
                                Add(val);
                              }}
                            >
                              Add
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              : ""}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Category;
