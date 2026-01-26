import React, { use } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';


const Review = ({ ReviewsPromise }) => {
    const review = use(ReviewsPromise);
    console.log(review);
  return (
    <div>
      <div className="text-center">
        <h3 className="text-3xl text-center">Review</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ut
          delectus accusamus reprehenderit expedita dolores similique placeat.
          Commodi aliquid autem, veritatis velit dolores amet at tempore vero
          nulla necessitatibus officia.
        </p>
      </div>
      <>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {review.map((revie) => (
            <SwiperSlide key={revie.id}>
              <ReviewCard revie={revie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Review;