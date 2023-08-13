import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

 

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

 

const PhotoSlider = ({photos , nonav}) => {



  const swiperRef = React.useRef(null);

  const handlePrev = (e) => {
    e.preventDefault();
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };
  
  return (
    <Swiper navigation={   { prevEl: '.custom-prev', nextEl: '.custom-next' }   } ref={swiperRef}
      spaceBetween={10}
      
      slidesPerView={1}
      
      pagination={{ clickable: true }}
      
    >
      {photos.map((photo, idx) => (
        <SwiperSlide key={idx}>
          <img    src={` http://localhost:4000/uploads/${photo} `} alt={`Photo ${idx + 1}`} className=" object-cover rounded-xl w-full h-full" />
       
        </SwiperSlide>
      ))}
    {nonav &&  <div >
      <button className='   scale-90 text-black flex items-center justify-center  mx-2 h-7 w-7 rounded-2xl  z-30     bg-white absolute  top-[50%]  ' onClick={handlePrev}>  <NavigateBeforeIcon fontSize='small'/>  </button>
      <button className= '  scale-90 text-black flex items-center justify-center  mx-2 h-7 w-7 rounded-2xl   right-1 z-30    bg-white absolute  top-[50%] ' onClick={handleNext}> <NavigateNextIcon fontSize='small'/></button>
    </div>}
    </Swiper>
  );
};

export default PhotoSlider;
