import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
 

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

 

const PhotoSlider = ({photos}) => {

  
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {photos.map((photo, idx) => (
        <SwiperSlide key={idx}>
          <img    src={` http://localhost:4000/uploads/${photo} `} alt={`Photo ${idx + 1}`} className=" rounded-xl w-full h-full" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PhotoSlider;
