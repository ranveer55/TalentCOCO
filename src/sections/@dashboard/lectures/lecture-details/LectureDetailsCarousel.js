import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import Image from '../../../../components/Image';
import LightboxModal from '../../../../components/LightboxModal';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' },
  },
}));

// ----------------------------------------------------------------------

LectureDetailsCarousel.propTypes = {
  lecture: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default function LectureDetailsCarousel({ lecture }) {
  
  const imagesLightbox = lecture.img.path;

 
  
  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
       <Box sx={{ display: 'flex', alignLectures: 'center' , width: 350, height: 280, mr: 2,border: '1px solid grey',marginTop:"40px",marginLeft:"20px"}}>
        <Image disabledEffect alt={lecture.img.path}  src={`http://13.127.215.34/${lecture.img.path}`} sx={{ marginLeft:"25px",borderRadius: 1.5, width: 250, height: 260, mr: 2 }} />
                
            </Box>
 </Box>
    </RootStyle>
  );
}
