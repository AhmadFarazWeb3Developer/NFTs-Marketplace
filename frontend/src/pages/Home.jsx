import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/Footer";
import TopCollections from "../components/home/TopCollections";
import CollectionStatistics from "../components/home/CollectionStatistics";
import useReadFactoryContract from "../blockchain-interaction/hooks/factory/useReadFactoryContract";

const Home = () => {
  useReadFactoryContract();

  return (
    <>
      <div className="home-page  bg-primary-black">
        <Navbar />
        <Hero />
        <TopCollections />
        <CollectionStatistics />
        <Footer />
      </div>
    </>
  );
};
export default Home;
