import React, { createContext, useContext } from "react";

const EpisodeFolderContext = createContext<string>("");

export const EpisodeFolderProvider: React.FC<{
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <EpisodeFolderContext.Provider value={value}>
      {children}
    </EpisodeFolderContext.Provider>
  );
};

export const useEpisodeFolder = () => {
  return useContext(EpisodeFolderContext);
};
