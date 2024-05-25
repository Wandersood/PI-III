import React, { createContext, useState, useContext } from "react";

// Cria um contexto
const TokenContext = createContext({});

// Cria um Provider para o contexto
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Cria um hook para usar o contexto
export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken precisa ser usado dentro de um TokenProvider");
  }
  return context;
};
