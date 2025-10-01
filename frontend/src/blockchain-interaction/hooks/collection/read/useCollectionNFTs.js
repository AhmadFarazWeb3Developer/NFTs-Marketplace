import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useReadSingleCollection from "../../nft/read/useReadSingleCollection";
import { SiTheodinproject } from "react-icons/si";

const useCollectionNFTs = () => {
  const { collection } = useParams();
  const { getNFTCollectionInstance } = useReadSingleCollection();

  const fetchNFTs = async () => {
    const instance = await getNFTCollectionInstance(collection);

    const tokenId = await instance.tokenId();
    console.log(tokenId);
  };

  useEffect(() => {
    fetchNFTs();
  });
};

export default useCollectionNFTs;
