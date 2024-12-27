"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import baner from './baner.module.css';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import img from '@/assets/images/car.png';
import img2 from '@/assets/images/phone.png';
import Image from 'next/image';

export default function Baner() {
  return (
    <div className={`${baner.banerContainer} xs:px-[10px] xs:max-w-[380px] xs:pt-[50px]`}> 
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className={baner.mySwiper}
      >
        <div
          slot="container-start"
          className={baner.parallax_bg}
          data-swiper-parallax="-23%"
        ></div>

        {/* Slide 1 - Car */}
        <SwiperSlide>
          <div className={baner.slideContent}>
            <div className={baner.textSection} data-swiper-parallax="-300">
              <h2 className={baner.title}>Новый автомобиль мечты</h2>
              <p className={baner.subtitle} data-swiper-parallax="-200">
                Скорость. Комфорт. Стиль.
              </p>
              <p className={baner.description} data-swiper-parallax="-100">
                Откройте для себя инновационный дизайн, продуманные технологии и мощность
                в каждом движении.
              </p>
            </div>
            <div className={baner.imageSection}>
              <Image src={img} alt="Car" className={baner.image} />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Phone */}
        <SwiperSlide>
          <div className={baner.slideContent}>
            <div className={baner.textSection} data-swiper-parallax="-300">
              <h2 className={baner.title}>Смартфон будущего</h2>
              <p className={baner.subtitle} data-swiper-parallax="-200">
                Бескомпромиссное качество.
              </p>
              <p className={baner.description} data-swiper-parallax="-100">
                Наслаждайтесь великолепным дисплеем, передовой камерой и высокой
                производительностью, которая всегда с вами.
              </p>
            </div>
            <div className={baner.imageSection}>
              <Image src={img2} alt="Phone" className={baner.image} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}