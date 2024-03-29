"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade, Autoplay, Scrollbar } from "swiper/modules";
import { FC } from "react";
import firstSlide from "../../public/main-slider/slide-1.png";
import secondSlide from "../../public/main-slider/slide-2.jpg";
import thirdSlide from "../../public/main-slider/slide-3.jpg";
import Image from "next/image";
import "swiper/swiper-bundle.css";

const MainSlider: FC = () => {
  return (
    <Swiper
      className='main-swiper border-4 rounded-[20px] border-solid border-[#ed5564] h-[200px] sm:h-[300px] xl:w-full'
      modules={[Autoplay, EffectFade, A11y, Scrollbar]}
      effect={"fade"}
      loop={true}
      slidesPerView={1}
      scrollbar={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <Image
          className='w-full h-full object-cover object-center rounded-[5px]'
          src={firstSlide}
          priority
          alt='slide game'
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className='w-full h-full object-cover object-center rounded-[5px] '
          src={secondSlide}
          priority
          alt='slide game'
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className='w-full h-full object-cover object-center rounded-[5px]'
          src={thirdSlide}
          priority
          alt='slide game'
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSlider;
