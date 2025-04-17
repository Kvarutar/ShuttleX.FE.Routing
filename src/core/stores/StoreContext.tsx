import React, { createContext, useContext } from "react";

import store from ".";

const StoreContext = createContext(store);

export const useAppStore = () => {
    const store = useContext(StoreContext);
    if (!store) throw new Error('Use App store within provider!');
    return store;
  };

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};