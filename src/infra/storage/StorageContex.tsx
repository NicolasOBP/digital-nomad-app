import React, { createContext, useContext } from "react";

import { IStorage } from "./IStorage";

const StorageContext = createContext<{ storage: IStorage }>({
  storage: {} as IStorage,
});

export function StorageProvider({
  children,
  storage,
}: React.PropsWithChildren<{ storage: IStorage }>) {
  return (
    <StorageContext.Provider value={{ storage }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error("Storage Context should be used within a StorageProvider");
  }

  return context;
}
