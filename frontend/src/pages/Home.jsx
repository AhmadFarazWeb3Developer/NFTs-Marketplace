import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/Footer";
import TopCollections from "../components/home/TopCollections";
import CollectionStatistics from "../components/home/CollectionStatistics";
import useReadContractInstance from "../blockchain-interaction/hooks/utils";
// import { useReadContract } from "wagmi";
// import { contractAddress, Abi } from "../blockchain-interaction/hooks/utils";

const Home = () => {
  const [contractResult, setContractResult] = useState(null);

  const { data, error, isLoading } = useReadContractInstance("collectionId");
  console.log("data : ", data);
  console.log("error : ", error);
  console.log("is loading : ", isLoading);
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
