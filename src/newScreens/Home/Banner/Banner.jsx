import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Banner1 from '../../../assets/Banner1.webp';
import Banner2 from '../../../assets/Banner2.webp'
import { useMediaQuery } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Banner = () => {
    const images = [
        {
          label: 'San Francisco – Oakland Bay Bridge, United States',
          imgPath:Banner1,
        },
        {
          label: 'Bird',
          imgPath:Banner2,
        },
      ];
      const theme = useTheme();
      const [activeStep, setActiveStep] = React.useState(0);
      const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
      const maxSteps = images.length;
    
      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStepChange = (step) => {
        setActiveStep(step);
      };
    
      return (
        <Box
      sx={{
        maxWidth: '100vw',
        flexGrow: 2,
        mt: 12,
        backgroundColor:"blue"
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: isMobile ? '35vh' : '75vh', // Adjust height based on device
                  margin: '0 auto',
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                  objectFit: 'fit', // Ensures the image covers the area
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
             {/* <p>This is some text in the first slide.</p> */}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
      );
}

export default Banner