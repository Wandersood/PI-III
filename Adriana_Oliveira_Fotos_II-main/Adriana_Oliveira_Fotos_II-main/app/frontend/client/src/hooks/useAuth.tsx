import { useContext } from "react";
import { UserAuthContext, AdminAuthContext } from "../contexts/auth/UserAuthenticationContext";

export function useUserAuth() {
  return useContext(UserAuthContext);
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
