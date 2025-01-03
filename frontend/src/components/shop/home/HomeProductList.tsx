import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '../product/ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import "./style.css";


interface Props{
    products:shopProduct[];
}

const HomeProductList: React.FC<Props> = ({products}) => {
    const rendering = (): JSX.Element[] => {
        const result:JSX.Element[] = [];
        for(let i = 0 ; i < products.length ; i++){
            result.push(<SwiperSlide key={i}><ProductCard product={products[i]}></ProductCard></SwiperSlide>)
        }
        return result;
    }
    return (
        <div>
            <Swiper
            className = "product-swiper"
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={5}
            loop={false}
            slidesPerGroup ={5}
            navigation>
                {rendering()}
            </Swiper>
        </div>
    );
}

export default HomeProductList;