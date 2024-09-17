import React, { useContext, useEffect, useRef, useState } from 'react'

import './Body.css';
import { Avatar } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { categoryService } from '../../../services/b2c_service';
import { getCart, getProductList } from '../../../utils/storage';
import { Link, useNavigate } from 'react-router-dom';
import { AddCart, RemoveCart } from '../../../services/cart_service';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useScrollToTop from '../../../helpers/useScrollToTop';
import { UserContext } from '../../../helpers/createContext';

const Body = () => {
  useScrollToTop()
  const navigate = useNavigate();
  const [farmItem, setFarmItem] = useState([]);
  const [category, setCategory] = useState([]);
  const [seasnal, setSeasnol] = useState([]);
  const [comboBag, setComboBag] = useState([]);
  const [cartData, setCartData] = useState();
  const scrollContainerRef = useRef(null);
  const { state,setState } = useContext(UserContext);
  useEffect(() => {
    setCartData(getCart());
    categoryService()
      .then((res) => {
        if (res.status === 201) {
          setCategory(res.data.result);
        } else {
          console.log("Error in Category loading");
        }
      })
      .catch((err) => console.log(err));
    setFarmItem(getProductList()
      ? getProductList().filter((data) => data.dailyFresh === true)
      : [])
    setSeasnol(
      getProductList()
        ? getProductList().filter((data) => data.seasonalProduct === true)
        : []
    )
    setComboBag(
      getProductList()?.filter((data) => data.productType === "ComboBag") || []
    )
  }, [state]);

  const Add = (data) => {
    const value = AddCart(data);
    if (value) {
      setCartData(getCart());
      setState(getCart())
    } else {
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
    navigate(`/product/${data._id}`, { state: data });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='newBody'>
        <h3>Shop by Category</h3>
        <div className='newBody0'>
          <button className="scroll-button left" onClick={scrollLeft}>
            <span className='icon'>&#9664;</span>
          </button>
          <div className='newBody1' ref={scrollContainerRef}>
            {category.map((value) => {
              return (
                <Link to={"/category"} state={value} style={{ textDecoration: 'none', color: 'inherit' }} className='newBodyCategory' >
                  <Avatar sx={{ width: 150, height: 150, margin: 3 }} src={value.image} />
                  <h5>{value.categoryName}</h5>
                </Link>
              )
            })}
          </div>
          <button className="scroll-button right" onClick={scrollRight}>
            <span className='icon'>&#9654;</span>
          </button>
        </div>
      </div>
      <h3>Daily Needs</h3>
      <div className='newDailyfresh'>
        {farmItem && farmItem.map((val) => {
          return (
            <Card
              onClick={() => handleRouting(val)} // Handle card click
              sx={{
                maxWidth: 200,
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
                  zIndex: 1,
                  p: 1, // Add padding to CardActions for better spacing
                }}
              >
                {/* <Button size="small" variant="text" color="success">
                            <FaRegHeart size={20} />
                          </Button> */}
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
                      e.stopPropagation(); // Prevent click event on button from triggering card's onClick
                      Add(val);
                    }}
                  >
                    Add
                  </Button>
                )}
              </CardActions>
            </Card>
          )
        })}
      </div>
      <div className='newDeals'>

      </div>
      <h3>Seasnol Products</h3>
      <div className='newSeasnol'>
        {seasnal && seasnal.map((val) => {
          return (
            <Card
              onClick={() => handleRouting(val)} // Handle card click
              sx={{
                minWidth: 200,
                maxWidth: 200,
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
                  zIndex: 1,
                  p: 1, // Add padding to CardActions for better spacing
                }}
              >
                {/* <Button size="small" variant="text" color="success">
                            <FaRegHeart size={20} />
                          </Button> */}
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
                      e.stopPropagation(); // Prevent click event on button from triggering card's onClick
                      Add(val);
                    }}
                  >
                    Add
                  </Button>
                )}
              </CardActions>
            </Card>
          )
        })}
      </div>
      <h3>Combo Bags</h3>
      <div className='newCombobag'>
        {comboBag && comboBag.map((val) => {
          return (
            <Card
              onClick={() => handleRouting(val)}
              sx={{
                minWidth: 200,
                maxWidth: 200,
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
                  zIndex: 1,
                  p: 1, // Add padding to CardActions for better spacing
                }}
              >
                {/* <Button size="small" variant="text" color="success">
                            <FaRegHeart size={20} />
                          </Button> */}
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
                      e.stopPropagation(); // Prevent click event on button from triggering card's onClick
                      Add(val);
                    }}
                  >
                    Add
                  </Button>
                )}
              </CardActions>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default Body