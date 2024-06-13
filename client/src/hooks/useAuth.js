import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
// Custom hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
