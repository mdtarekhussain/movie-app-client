// src/context/SearchContext.jsx
import { createContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        isSearching,
        setIsSearching,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchContext;
