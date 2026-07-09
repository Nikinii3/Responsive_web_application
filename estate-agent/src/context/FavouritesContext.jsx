import React, { createContext, useContext, useState } from 'react';

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  // add property to favouritess (no duplicates)
  const addFavourite = (property) => {
    setFavourites((prev) => {
      if (prev.find((p) => p.id === property.id)) return prev;
      return [...prev, property];
    });
  };

  // this removes a single property
  const removeFavourite = (propertyId) => {
    setFavourites((prev) => prev.filter((p) => p.id !== propertyId));
  };

  // clears all favourites
  const clearFavourites = () => setFavourites([]);

  const isFavourite = (propertyId) => favourites.some((p) => p.id === propertyId);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, clearFavourites, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}
