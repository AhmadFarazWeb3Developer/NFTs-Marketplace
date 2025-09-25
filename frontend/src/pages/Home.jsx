import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/Footer";
import TopCollections from "../components/home/TopCollections";
import CollectionStatistics from "../components/home/CollectionStatistics";
import useCollectionId from "../blockchain-interaction/hooks/useCollectionId";
import useWriteContract from "../blockchain-interaction/hooks/useWriteContract";
import useReadCollections from "../blockchain-interaction/hooks/useReadCollections";

const Home = () => {
  const { collectionId } = useCollectionId();
  useReadCollections();
  useWriteContract();

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
