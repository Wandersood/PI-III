import React, { useState, useEffect, useContext, createContext } from "react";
import { getAuthStateFromIndexedDB } from "../../indexedDB";

type AuthContextType = {
  authAdmin: string;
  setAuthAdmin: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserAuthContext = createContext({});
export const AdminAuthContext = React.createContext<
  AuthContextType | undefined
>(undefined);
export function UserAuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {props.children}
    </UserAuthContext.Provider>
  );
}

export function AdminAuthProvider(props) {
  const [authAdmin, setAuthAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAuthStateFromIndexedDB();
        if (token !== null) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Erro ao buscar token", error);
      }
    };

    fetchToken();
  }, []);

  const value = {
    authAdmin,
    setAuthAdmin,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {props.children}
    </AdminAuthContext.Provider>
  );
}
