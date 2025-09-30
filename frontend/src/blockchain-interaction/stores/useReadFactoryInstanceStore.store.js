import { create } from "zustand";

const useReadFactoryInstanceStore = create((set) => ({
  factoryReadInstance: null,

  setFactoryReadInstance: (readInstance) =>
    set({ factoryReadInstance: readInstance }),
}));

export default useReadFactoryInstanceStore;
