import { removeTokenFromIndexedDB } from "../indexedDB";

const API = "http://localhost:8004/app";

const handleErrors = async (response) => {
  if (!response.ok) {
    let errorMessage;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.detail;
    } catch (e) {
      console.error("Erro ao converter mensagem de erro", e);
    }
    throw Error(errorMessage);
  }
  return response;
};

export const login = async (data) => {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  await handleErrors(response);
  const token = await response.json();
  return token;
};

//Provisório, será posteriormente substituído pelo backend
export const logout = async (currentUser, setCurrentUser) => {
  await removeTokenFromIndexedDB();
  setCurrentUser(null);
};
