// components/WishlistContext.js
import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };
  const toggleWishlistItem = (product) => {
  isInWishlist(product.id)
    ? removeFromWishlist(product.id)
    : addToWishlist(product);
};

  return (
   <WishlistContext.Provider
  value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlistItem }}
>

      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
