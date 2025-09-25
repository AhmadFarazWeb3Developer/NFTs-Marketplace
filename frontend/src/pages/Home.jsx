import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/Footer";
import TopCollections from "../components/home/TopCollections";
import CollectionStatistics from "../components/home/CollectionStatistics";
import useCollectionId from "../blockchain-interaction/hooks/collection/read/useCollectionId";
import useWriteFactoryContract from "../blockchain-interaction/hooks/factory/useWriteFactoryContract";
import useReadAllCollections from "../blockchain-interaction/hooks/collection/read/useReadAllCollections";

const Home = () => {
  const { collectionId } = useCollectionId();
  useReadAllCollections();
  useWriteFactoryContract();

  useEffect(() => {
    console.log("collectionId:", collectionId);
  }, [collectionId]);

  return (
    <>
      <div className="home-page h-screen bg-primary-black">
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
