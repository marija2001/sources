import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import HomeProjectCard from "../HomeProjectCard/HomeProjectCard";
import "swiper/css";
import "./ProjectCarousel.css";

const MIN_TAPE_SLIDES = 9;

function buildTapeStrip(items) {
  if (!items?.length) return [];
  if (items.length >= 3) return items;
  const tape = [];
  let i = 0;
  while (tape.length < MIN_TAPE_SLIDES) {
    tape.push(items[i % items.length]);
    i += 1;
  }
  return tape;
}

function ProjectCarousel({ projects }) {
  const swiperRef = useRef(null);
  const tape = buildTapeStrip(projects);

  if (!projects?.length) {
    return (
      <p className="project-carousel__empty">
        No projects to show yet.
      </p>
    );
  }

  return (
    <div className="project-carousel">
      <button
        type="button"
        className="project-carousel__arrow project-carousel__arrow--side project-carousel__arrow--prev"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
      >
        <HiOutlineChevronLeft aria-hidden />
      </button>

      <div className="project-carousel__viewport">
        <Swiper
          className="project-carousel__swiper"
          rewind
          slidesPerView={3}
          spaceBetween={22}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 18 },
            560: { slidesPerView: 2, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 22 },
          }}
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
        >
          {tape.map((card, index) => (
            <SwiperSlide
              key={`${card.id ?? card._id}-${index}`}
              className="project-carousel__slide"
            >
              <HomeProjectCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        type="button"
        className="project-carousel__arrow project-carousel__arrow--side project-carousel__arrow--next"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
      >
        <HiOutlineChevronRight aria-hidden />
      </button>
    </div>
  );
}

export default ProjectCarousel;
