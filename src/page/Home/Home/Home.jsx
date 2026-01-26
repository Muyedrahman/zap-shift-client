import React from 'react';
import Banner from './Banner/Banner';
import Works from '../Works/Works';
import Services from '../Services/Services';
import Brands from '../Brands/Brands';
import Review from '../Review/Review';


const ReviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
      <div>
        <Banner />
        <Brands />
        <Review ReviewsPromise={ReviewsPromise} />
        <Works />
        <Services />
      </div>
    );
};

export default Home;