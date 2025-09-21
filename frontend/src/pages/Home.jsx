import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/Footer";
import TopCollections from "../components/home/TopCollections";
import CollectionStatistics from "../components/home/CollectionStatistics";
import useCollectionId from "../blockchain-interaction/hooks/useCollectionId";

const Home = () => {
  const { collectionId, error, isLoading, isError } = useCollectionId();

  console.log("collectionId", collectionId);
  console.log("error", error);
  console.log("is loading", isLoading);
  console.log("is error", isError);

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
