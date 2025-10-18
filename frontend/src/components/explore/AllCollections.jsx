import { useEffect, useState } from "react";
import useReadAllCollections from "../../blockchain-interaction/hooks/collection/read/useReadAllCollections";
import useReadFactoryContract from "../../blockchain-interaction/hooks/factory/useReadFactoryContract";
import CollectionCard from "../CollectionCard";
import Navbar from "../Navbar";

import { LucideSortAsc } from "lucide-react";

import { GrNext, GrPrevious } from "react-icons/gr";
import useCollectionStore from "../../blockchain-interaction/stores/useCollectionStore.store";
import useReadSingleCollection from "../../blockchain-interaction/hooks/nft/read/useReadSingleCollection";
import useReadFactoryInstanceStore from "../../blockchain-interaction/stores/useReadFactoryInstanceStore.store";
const AllCollections = () => {
  useReadAllCollections();
  useReadFactoryContract();

  const [collectionsData, setCollectionsData] = useState([
    {
      collectioId: "",
      collection: "",
      accountAddress: "",
      collectionImage: "",
    },
  ]);
  const { collections } = useCollectionStore();
  const { getNFTCollectionInstance, signer } = useReadSingleCollection();
  const { factoryReadInstance } = useReadFactoryInstanceStore();

  useEffect(() => {
    const loadCollections = async () => {
      const data = await Promise.all(
        collections.map(
          async ({ collectionAddress, accountAddress, image }) => {
            console.log("collection Address : ", collectionAddress);
            console.log("account Address : ", accountAddress);
            console.log("account Address : ", image);

            const instance = await getNFTCollectionInstance(collectionAddress);
            const id = await factoryReadInstance.collectionAddressToId(
              collectionAddress
            );

            return {
              collectionId: id,
              collection: instance,
              accountAddress,
              image,
            };
          }
        )
      );

      setCollectionsData(data);
    };

    if (collections.length > 0) {
      loadCollections();
    }
  }, [collections]);

  return (
    <>
      <Navbar />
      <div className="all-collection w-full flex  items-center flex-col bg-primary-black  text-white px-10 py-4 text-sm ">
        <h1 className="font-unbounded text-action-btn-green font-semibold text-lg">
          ALL <span className="text-white">COLLECTIONS</span>
        </h1>

        <div className="containter  py-6 flex flex-row  gap-4">
          <div className="left rounded-sm py-2 pl-5 pr-10  bg-white/5 backdrop-blur-md flex flex-col gap-1 text-paragraph font-unbounded text-xs">
            <div className="flex flex-row gap-1 items-center">
              <LucideSortAsc size={16} />
              <h2>Sort By</h2>
            </div>

            <div className="flex flex-row items-center  gap-3 mt-4 font-light cursor-pointer">
              <input type="radio" className="bg-paragraph" />
              <label htmlFor="">Name</label>
            </div>

            <div className="flex flex-row items-center  gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">#ID</label>
            </div>

            <div className="flex flex-row  items-center gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">Price</label>
            </div>
            <div className="flex flex-row  items-center  gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">Items</label>
            </div>
            <div className="flex flex-row  items-center   gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">Owners</label>
            </div>
            <div className="flex flex-row items-center   gap-3 mt-1 font-light">
              <input type="radio" />
              <label htmlFor="">Remaining</label>
            </div>
          </div>

          <div className="right-container border-1  border-white/5 rounded-sm ">
            <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase dark:text-gray-500 font-unbounded font-light">
                <tr>
                  <th scope="col" className="px-2 py-3 "></th>

                  <th scope="col" className="px-2 py-3 ">
                    NAME
                  </th>
                  <th scope="col" className="px-2 py-3 ">
                    SYMBOL
                  </th>

                  <th scope="col" className="px-2 py-3">
                    AVG PRICE
                  </th>
                  <th scope="col" className="px-2 py-3">
                    ITEMS
                  </th>
                  <th scope="col" className="px-2 py-3">
                    OWNERS
                  </th>
                  <th scope="col" className="px-2 py-3">
                    REMAINING
                  </th>
                  <th scope="col" className="px-2 py-3">
                    FOR SALE
                  </th>
                </tr>
              </thead>
            </table>

            {collectionsData.map(
              ({ index, collectionId, collection, accountAddress, image }) => (
                <CollectionCard
                  key={index}
                  collectionId={collectionId}
                  collection={collection}
                  accountAddress={accountAddress}
                  image={image}
                />
              )
            )}
          </div>
        </div>

        <div className="next-previous-btns flex flex-row items-center  gap-5  font-unbounded font-extralight text-action-btn-green">
          <div className=" cursor-pointer">
            <GrPrevious />
          </div>
          <div className="">0</div>
          <span>/</span>
          <div>901</div>
          <div className="flex justify-center items-center cursor-pointer">
            <GrNext />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCollections;
