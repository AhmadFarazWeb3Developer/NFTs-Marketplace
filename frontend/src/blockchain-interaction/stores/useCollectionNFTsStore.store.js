import { create } from "zustand";

const useCollectionNFTsStore = create((set) => ({
  collectionInstance: null,
  collectionId: null,
  collectionName: null,
  totalItems: null,
  avgPrice: null,
  volume: null,
  NFTsPricesAndIds: [],
  isLoading: false,

  setCollectionData: (data) => set(data),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useCollectionNFTsStore;
