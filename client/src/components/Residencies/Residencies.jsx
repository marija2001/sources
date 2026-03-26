import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import ProjectCard from "../ProjectCard/ProjectCard";
import useProjects from "../../hooks/useProjects";
import {PuffLoader} from 'react-spinners'

const Residencies = () => {

  const {data, isError, isLoading} = useProjects()

  if (isError) {
    return (
      <section className="home-projects-band" id="residencies">
        <div className="home-projects-band-body paddings innerWidth flexCenter">
          <span>Error while fetching data</span>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="home-projects-band" id="residencies">
        <div
          className="home-projects-band-body flexCenter paddings innerWidth"
          style={{ minHeight: "60vh" }}
        >
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#4066ff"
            aria-label="puff-loading"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="home-projects-band" id="residencies">
      <div className="home-projects-band-body">
        <div className="paddings innerWidth r-container">
        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {/* slider */}
          {(data ?? []).slice(0, 8).map((card, i) => (
            <SwiperSlide key={i}>
              <ProjectCard card={card}/>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Residencies;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
