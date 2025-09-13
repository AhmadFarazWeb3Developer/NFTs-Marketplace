import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import TopCollections from "../components/TopCollections";
import CollectionStatistics from "../components/CollectionStatistics";

const Home = () => {
  return (
    <>
      <div className="home-page" class=" h-screen bg-primary-black">
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
