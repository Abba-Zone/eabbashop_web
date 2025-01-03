import React, { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getBannerList_s } from '../../../services/file';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./style.css";

const Banner: React.FC = () => {
    const [banners, setBanners] = useState<string[]>([]);
    const getBanner = useCallback (async () => {
        try {
          const BannerList : string[] = await getBannerList_s();
          setBanners(BannerList);
        } catch (error) {
          console.error('Error fetching banner list:', error);
        }
    },[]);
    const rendering = (): JSX.Element[] => {
        const result:JSX.Element[] = [];
        for(let i = 0 ; i < banners.length ; i++){
            result.push(<SwiperSlide key={i}><img src={banners[i]}/></SwiperSlide>)
        }
        return result;
    }
    useEffect(() => {
        getBanner(); // 비동기 함수 호출
    }, [getBanner]);
    
    return (
        <div>
            <Swiper
            className = "home-banner"
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{delay: 10000}}>
                {rendering()}
            </Swiper>
        </div>
    );
}

export default Banner;