import React, { useEffect, useState } from 'react'

import './Body.css';
import { Avatar } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { categoryService } from '../../../services/b2c_service';
import { getProductList } from '../../../utils/storage';
import { FaRegHeart } from 'react-icons/fa';

const Body = () => {
    const [farmItem, setFarmItem] = useState([]);
    const [category, setCategory] = useState([]);
    const [seasnal, setSeasnol] = useState([])

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
      setFarmItem(getProductList()
      ? getProductList().filter((data) => data.dailyFresh === true)
      : [])
      setSeasnol(
        getProductList()
        ? getProductList().filter((data) => data.seasonalProduct === true)
        : []
      )
  }, []);
  return (
    <>
    <div className='newBody'>
        <h1>Shop by Category</h1>
       <div className='newBody1'>
       {category.map((value)=>{
            return(<Avatar sx={{ width: 200, height: 200 , margin:3}} src={value.image}/>)
        })}
       </div>
    </div>
    <h1>Daily Needs</h1>
    <div className='newDailyfresh'>
        {farmItem.map((val)=>{
            return(
     <Card sx={{ minWidth: 200, marginRight:2 }}>
      <CardMedia
        sx={{ height: 150 }}
        image={val.image}
        title="green iguana"
      />
      <CardContent >
        <Typography gutterBottom variant="body2">
          {val.productName}
        </Typography>
        <Typography variant="caption" color="green">
          {val.productTypeMasterId.productType}
        </Typography>
        <Typography variant="body2" color="text-secondary">
          {val.unit}{val.unitValue} - ₹{val.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='text' color='success'><FaRegHeart size={20} /></Button>
        <Button size="small" variant='contained' color='success'>Add</Button>
      </CardActions>
      </Card>
        )
        })}
    </div>
    <div className='newDeals'>

    </div>
    <h1>Seasnol Products</h1>
    <div className='newSeasnol'>
    {seasnal.map((val)=>{
            return(
     <Card sx={{ minWidth: 200, marginRight:2 }}>
      <CardMedia
        sx={{ height: 150 }}
        image={val.image}
        title="green iguana"
      />
      <CardContent >
        <Typography gutterBottom variant="body2">
          {val.productName}
        </Typography>
        <Typography variant="caption" color="green">
          {val.productTypeMasterId.productType}
        </Typography>
        <Typography variant="body2" color="text-secondary">
          {val.unit}{val.unitValue} - ₹{val.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='text' color='success'><FaRegHeart size={20} /></Button>
        <Button size="small" variant='contained' color='success'>Add</Button>
      </CardActions>
      </Card>
        )
        })}
    </div>
    </>
  )
}

export default Body