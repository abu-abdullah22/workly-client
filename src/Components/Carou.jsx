// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import bg1 from '../assets/images/bg1.jpg'
import bg2 from '../assets/images/bg2.jpg'
import bg3 from '../assets/images/bg3.jpg'



// import required modules
import { Pagination } from 'swiper/modules';
import Slide from './Slide';

export default function App() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <div className='py-12 px-8 container mx-auto'>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><Slide image={bg1}></Slide></SwiperSlide>
        <SwiperSlide><Slide image={bg2}></Slide></SwiperSlide>
        <SwiperSlide><Slide image={bg3}></Slide></SwiperSlide>
    
      </Swiper>
    </div>
  );
}
