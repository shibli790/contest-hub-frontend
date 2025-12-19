import React from 'react';
import BannerSection from '../Banner';
import PopularContest from '../PopularContest/PopularContest';
import WinnerAdvertisement from '../WinnerAdvertisement/WinnerAdvertisement';
import ContestHub from '../ContestHub/ContestHub';
import WhyChooseContestHub from './WhyChooseContestHub/WhyChooseContestHub';
import FAQ from '../FAQ/FAQ';

const Home = () => {
  return (
    <div>
      <BannerSection />
      <PopularContest />
      <WinnerAdvertisement />
      <ContestHub />
      <WhyChooseContestHub />
      <FAQ/>
    </div>
  );
};

export default Home;
