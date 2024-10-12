'use client'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import './slideshow.css';
import Image from 'next/image';





interface Props {
  images: string[]
  title: string
  className?: string
}


export const ProductMobileSlideshow = ({ images, title, className }: Props) => {



  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100%',
          height: '500px'
        }}
        pagination
        navigation={true}
        autoplay={{
          delay: 3000
        }}

        modules={[FreeMode, Navigation, Autoplay, Pagination]}
        className="mySwiper2"
      >

        {
          images.map(image => (
            <SwiperSlide key={image}>
              <Image
                src={`/products/${image}`}
                alt={title}
                width={600}
                height={500}
                className='object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div >

  );
};