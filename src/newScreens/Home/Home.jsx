import React from 'react'
import Banner from './Banner/Banner'
import Body from './Body/Body'
import './Home.css'
import { getProductList } from '../../utils/storage'
import { Box, CircularProgress, Skeleton, Stack, Typography } from '@mui/material'
import FooterScreen from '../../screens/home/footer/footer'

const Home = () => {
  return (
    <div className='newHome'>
        {getProductList()?
        <div>
        <Banner/>
        <Body/>
        <FooterScreen/>
        </div>:
        <Stack
        sx={{
          bgcolor: '#fff',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Skeleton
          sx={{ bgcolor: 'grey.200', width: '100%', height: '400px' }}
          variant="rectangular"
        />
        <Box sx={{ display: 'flex', width:'100%',justifyContent:"center" }}>
      <CircularProgress  color='success'/>
    </Box>
        <Skeleton sx={{ bgcolor: 'grey.200' }} width="50%" height="50px">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton sx={{ bgcolor: 'grey.300' }} width="60%" height="50px">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton sx={{ bgcolor: 'grey.200' }} width="50%" height="50px">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton sx={{ bgcolor: 'grey.300' }} width="60%" height="50px">
          <Typography>.</Typography>
        </Skeleton>
      </Stack>
        }
    </div>
  )
}

export default Home