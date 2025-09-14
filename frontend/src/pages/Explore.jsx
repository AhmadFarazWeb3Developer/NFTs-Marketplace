import AllCollections from "../components/explore/AllCollections";
import AllNFTs from "../components/explore/AllNFTs";

const Explore = () => {
  return (
    <>
      <div className="explore-page">
        <AllCollections />
        <AllNFTs />
      </div>
    </>
  );
};

export default Explore;
