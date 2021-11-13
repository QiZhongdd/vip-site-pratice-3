import React, { useState, useRef, FC } from "react";
import SwiperCore, {
  Pagination,
  Autoplay,
  EffectFade,
  Mousewheel,
} from "swiper";
import 'swiper/swiper-bundle.min.css';

import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Pagination, Autoplay, EffectFade, Mousewheel]);

import "./Gllery.css";
// 自定义hooks
import { useViewport } from "@hooks/index";
const bannerList = [
  {
    img: "b1.png",
    title: "这酒怎么喝？干了！",
    info:
      "这一期线下的女同学最多，很多女同学已经进入滴滴大厂是Leader。愿各位越来越好~",
    id: 1,
  },
  {
    img: "b2.png",
    title: "那一夜，他哭了！",
    info:
      "他说从来没有跟别人喝过这么多酒。那一夜，我的眼眶也湿润了，因为不舍得你们离开。",
    id: 2,
  },
  {
    img: "b3.png",
    title: "2020深圳线下加强营",
    info:
      "分享的同学，从外包离开喜提了阿里的30k offer。离开深圳也是很多不舍，因为我怕你们面试被欺负。",
    id: 3,
  },
  {
    img: "b4.png",
    title: "尝尝老袁的家乡菜",
    info: `这一期线下的同学不多，结课那一晚我们来了场"生死局"。吃全了老袁的家乡菜`,
    id: 4,
  },
  {
    img: "b5.png",
    title: "全国三周年大会",
    info:
      "所有礼物均已就绪，是老袁精挑细选的。这一天来自全国各地的同学相聚在这，那一晚老袁喝多了。",
    id: 5,
  },
  {
    img: "b6.png",
    title: "依稀的记得这一天",
    info:
      "老袁早早来到了会场，这一场全国毕业生见面大会，我激动得一晚上没睡着，我准备好了一切等你们归来！",
    id: 6,
  },
  {
    img: "b7.png",
    title: "说实话有时候挺心疼大家",
    info:
      "忙碌了一周以后，周末早晨9点就要坐到教室，晚上11点才能回家，但是大家付出的努力总归得到了回报。",
    id: 7,
  },
  {
    img: "b8.png",
    title: "有些人永远不会忘记",
    info:
      "在线教育不是一个个账号，而是一颗颗滚烫的心。有些人永远不会忘记，有些人也永远不会走远。",
    id: 8,
  },
];

const SwiperSlier: FC<{}> = () => {
  // console.log('swiper组件');
  const { wh } = useViewport();
  return (
    <div className="gallery-box" style={{ height: wh * 0.9 }}>
      <Swiper
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        speed={600}
        effect={"slide"}
        loop={true}
        direction={"vertical"}
        pagination={{ clickable: true }}
        mousewheel={true}
      >
        {bannerList.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="swiper-item">
              <div className="item-text">
                <h1>{item.title}</h1>
                <p>{item.info}</p>
              </div>
              <img src={require(`@assets/images/${item.img}`)} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
// 他会进行浅比较 默认meiyouqianbijiao
export default React.memo(SwiperSlier);

