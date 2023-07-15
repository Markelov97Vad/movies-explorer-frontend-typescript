import { createContext } from "react";
import { CurrentUser } from "../components/Types/currentUser.types";

interface ICurrentUser {
  loggetIn: boolean;
  currentUser: CurrentUser | null;
}

export const CurrentUserContext = createContext({} as ICurrentUser);