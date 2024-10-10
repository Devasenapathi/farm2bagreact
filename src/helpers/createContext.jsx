import React, { createContext, useEffect, useState } from 'react';
import { getLocationDetails, setLocationDetails, setProductList, setUserLocation } from '../utils/storage';
import { farmItemService, farmsService } from '../services/b2c_service';

export const UserContext = createContext();
export const ProductContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, setState] = useState({ user: null });

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export const ProductProvider = ({ children }) => {
  const [productLists, setProductLists] = useState({ product: null })

  return (
    <ProductContext.Provider value={{ productLists, setProductLists }}>
      {children}
    </ProductContext.Provider>
  )
}
