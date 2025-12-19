import React from 'react';
import BannerSection from '../Banner';
import PopularContest from '../PopularContest/PopularContest';
import WinnerAdvertisement from '../WinnerAdvertisement/WinnerAdvertisement';
import ContestHub from '../ContestHub/ContestHub';

const Home = () => {
  return (
    <div>
      <BannerSection />
      <PopularContest />
      <WinnerAdvertisement />
      <ContestHub/>
    </div>
  );
};

export default Home;
