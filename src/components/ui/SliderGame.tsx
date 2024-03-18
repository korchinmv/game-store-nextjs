"use client";
import { Screenshot } from "@/types/Screenshot";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import "react-photo-view/dist/react-photo-view.css";
import "swiper/swiper-bundle.css";

interface Screens {
  screenshots: Screenshot[];
}

const SliderGame = ({ screenshots }: Screens) => {
  const [activeThumb, setActiveThumb] = useState<any>(null);

  return (
    <>
      <PhotoProvider>
        <Swiper
          className='thumbs-slider-game-page w-full mb-[15px]'
          thumbs={{
            swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[FreeMode, Navigation, Pagination, Thumbs]}
          loop={true}
        >
          {screenshots.map((screenshot: Screenshot, index: number) => {
            return (
              <SwiperSlide key={screenshot.id}>
                <PhotoView key={index} src={screenshot.image}>
                  <Image
                    className='w-full h-auto object-cover object-center cursor-pointer'
                    src={screenshot.image}
                    priority
                    alt='game screenshot'
                    width='0'
                    height='0'
                    sizes='100vw'
                  />
                </PhotoView>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </PhotoProvider>

      <Swiper
        className='slider-game-page w-full'
        onSwiper={setActiveThumb}
        spaceBetween={10}
        modules={[FreeMode, Navigation, Thumbs]}
        slidesPerView={3}
        freeMode={true}
        navigation={true}
        watchSlidesProgress={true}
      >
        {screenshots.map((screenshot: Screenshot) => {
          return (
            <SwiperSlide key={screenshot.id}>
              <Image
                className='object-cover object-center cursor-pointer w-auto h-[115px]'
                src={screenshot.image}
                priority
                alt='game slide picture'
                width='200'
                height='115'
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SliderGame;
