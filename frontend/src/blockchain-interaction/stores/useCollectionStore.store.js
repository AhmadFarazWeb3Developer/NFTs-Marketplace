import { create } from "zustand";

const useCollectionStore = create((set) => ({
  collections: [],

  setCollections: (newCollections) => set({ collections: newCollections }),

  addCollection: (collection) =>
    set((state) => ({
      collections: [...state.collections, collection],
    })),

  clearCollections: () => set({ collections: [] }),
}));

export default useCollectionStore;
