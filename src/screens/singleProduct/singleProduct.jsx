import React, { useContext, useEffect, useState } from "react";
import { getCart, getProductList } from "../../utils/storage";
import { AddCart, RemoveCart } from "../../services/cart_service";
import "./singleProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import CartButton from "../cart/cart_button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { itemDetailsService } from "../../services/b2c_service";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useScrollToTop from "../../helpers/useScrollToTop";
import { UserContext } from "../../helpers/createContext";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [product, setProduct] = useState()
  const [farmItem, setFarmItem] = useState([]);
  const [cartData, setCartData] = useState();
  const { setState } = useContext(UserContext);
  useScrollToTop()
  useEffect(() => {
    if (getProductList()) {
      setProduct(getProductList() && getProductList().filter(
        (data) =>
          data._id ===
          id
      )[0])
    } else {
      itemDetailsService({ 'id': id }).then((res) => { setProduct(res.data.result) })
    }
    setCartData(getCart());
  }, [id]);

  useEffect(() => {
    if (product) {
      setFarmItem(
        getProductList()
          ? getProductList().filter(
            (data) =>
              data.productCategoryId
                ._id ===
              product.productCategoryId
                ._id
          )
          : ""
      );
    }
  }, [product])

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
  
  const handleRouting = (data) =>{
      navigate(`/product/${data._id}`, { state: data });
  }
  return (
    <>
    <ToastContainer/>
      {product && <div className="singleProduct">
        <IoMdArrowRoundBack size={30} onClick={() => navigate(-1)} />
        <div className="singleProduct-content">
          <div className="singleProduct-image">
            {product ? (
              <img
                src={product.image}
                alt=""
                className="singleProduct-item-image"
              ></img>
            ) : (
              ""
            )}
          </div>
          <div className="singleProduct-cart">
            <h2>{product.productName}</h2>
            <p>{product.productTypeMasterId && product.productTypeMasterId.productType}</p>
            <h4>
              {product.unit} {product.unitValue} - ₹
              {product.price}
            </h4>

            {cartData && (
              <div className="cart-button">
                {cartData.find((item) => item._id === product._id) !==
                  undefined &&
                  cartData.find((item) => item._id === product._id)
                    .quantity > 0 ? (
                  <button onClick={() => Remove(product)}>-</button>
                ) : (
                  ""
                )}
                {cartData.find((item) => item._id === product._id) !==
                  undefined &&
                  cartData.find((item) => item._id === product._id)
                    .quantity > 0 ? (
                  <h5>
                    {
                      cartData.find((item) => item._id === product._id)
                        .quantity
                    }
                  </h5>
                ) : (
                  ""
                )}
                <button onClick={() => Add(product)}>+</button>
              </div>
            )}
          </div>
        </div>
        <div className="singleProduct-description">
          <h4>Description</h4>
          <p>{product.description}</p>
          {product.comboBag.length > 0 &&
            <TableContainer component={Paper} sx={{ width: "50%" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.comboBag.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.productName}
                      </TableCell>
                      <TableCell>{row.unit}{row.unitValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </div>
        {farmItem && (
          <div className="product-main">
            <h3>Related products</h3>
            <div className="product-content">
              {farmItem.filter((val)=>val._id !== id).map((val, index) => {
                return (
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
                            {val.productTypeMasterId && val.productTypeMasterId.productType}
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
                );
              })}
            </div>
          </div>
        )}
        {getProductList() && <CartButton />}
      </div>}
    </>
  );
};
export default SingleProduct;
