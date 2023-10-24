import React from 'react'
import "./style.scss";
import Herobanner from './HeroBanner/herobanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/toprated';
const home = () => {
  return (
    <div className='homePage'>
      <Herobanner />
      <Trending />
      <Popular  />
      <TopRated />
    </div>
  )
}

export default home;
