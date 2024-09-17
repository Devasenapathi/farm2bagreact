import React, { useContext, useEffect, useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Category.css";
import useScrollToTop from "../../helpers/useScrollToTop";
import { UserContext } from "../../helpers/createContext";


const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [farmItem, setFarmItem] = useState([]);
  const [cartData, setCartData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [category, setCategory] = useState([]);
  const { setState } = useContext(UserContext);
  useScrollToTop()

  useEffect(() => {
    if(!selectedCategory){
      setSelectedCategory(location.state);
    }
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
      setState(getCart())
    }else{
      toast.error("Maximum quantity added to cart")
    }
  };
  const Remove = (data) => {
    const value = RemoveCart(data);
    if (value) {
      setCartData(getCart());
      setState(getCart())
    }
  };

  const handleRouting = (data) => {
    navigate('.',{replace:true, state:data.productCategoryId})
    navigate(`/product/${data._id}`, { state: data });
  };
  return (
    <div className="newCategory">
      <ToastContainer/>
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
                    selectedCategory._id === val._id ? "#12AD2B" : "",
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
        <h4>{selectedCategory && selectedCategory.categoryName}</h4>
        <Box sx={{ flexGrow: 1, mt: 4, mr: 0, ml: 1 }}>
          <Grid
            container
            spacing={{ xs: 0, md: 0 }}
            columns={{ xs: 4, sm: 8, md: 16 }}
          >
            {farmItem
              ? farmItem.map((val, index) => {
                  return (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <Card
                        onClick={() => handleRouting(val)}
                        sx={{
                          minWidth: 125,
                          minHeight: 330,
                          mb: 1,
                          mr: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          cursor: "pointer",
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
                            zIndex: 1,
                            p: 1,
                          }}
                        >
                          {cartData.find((item) => item._id === val._id)
                            ?.quantity > 0 ? (
                            <div
                              className="cart-button"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  Remove(val);
                                }}
                              >
                                -
                              </button>
                              <Typography variant="h6" sx={{ mx: 1 }}>
                                {
                                  cartData.find((item) => item._id === val._id)
                                    ?.quantity
                                }
                              </Typography>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  Add(val);
                                }}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={(e) => {
                                e.stopPropagation();
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
