import "./Home.css";
import React, { FC } from "react";
import Swiper from '@components/Gallery/Gallery';
const Home: FC<{}> = () => {
  return (
    <>
      <div className='page-home layout-container'>
        <div className='banner-box'>
            {/* 轮播组件 swiper */}
            <Swiper />
        ]</div>
      </div>
    </>
  );
};
export default Home;
