import { createContext } from "react";

const UserAuthenticatedContext = createContext({});

export default UserAuthenticatedContext;

export const { Provider, Consumer } = UserAuthenticatedContext;
