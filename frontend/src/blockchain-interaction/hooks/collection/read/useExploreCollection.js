import { useParams } from "react-router-dom";
import useReadSingleCollection from "../../nft/read/useReadSingleCollection";

const useExploreCollection = () => {
  const { collection } = useParams();
  const { getNFTCollectionInstance } = useReadSingleCollection();

  const fetchCollectionsDetails = async () => {
    const instance = await getNFTCollectionInstance(collection);
    console.log(await instance.symbol());
    console.log(await instance.tokenId());
  };

  fetchCollectionsDetails();
  return collection;
};

export default useExploreCollection;
