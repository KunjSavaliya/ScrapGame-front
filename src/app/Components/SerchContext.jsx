
'use client';

import React, { createContext, useState, useContext } from 'react';
const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearch = () => {
    setIsSearchVisible(prev => !prev);
  };
  return (
    <SearchContext.Provider value={{ isSearchVisible, toggleSearch, setIsSearchVisible }}>
      {children}
    </SearchContext.Provider>
  );
};
export const useSearch = () => {
  return useContext(SearchContext);
};
