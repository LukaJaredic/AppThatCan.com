import React, { createContext, useContext, useEffect, useState } from "react";
import { storageKeys } from "../utils/consts";
import { getCurrentUser } from "../services/user";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    if (localStorage.getItem(storageKeys.token)) {
      getCurrentUser().then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
