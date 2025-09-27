import React, { useEffect } from "react";
import useReadAllCollections from "../blockchain-interaction/hooks/collection/read/useReadAllCollections";
import useUpdateSaleStatus from "../blockchain-interaction/hooks/nft/write/useUpdateSaleStatus";

const UpdateNFTSaleStatus = () => {
  const { collections } = useReadAllCollections();
  const { updateSaleStatus } = useUpdateSaleStatus();

  useEffect(() => {
    const init = async () => {
      await updateSaleStatus(collections[0], 1, true);
    };
    init();
  }, [collections]);

  return <div>UpdateNFTSaleStatus</div>;
};

export default UpdateNFTSaleStatus;
