import { createContext } from "react";
import { CurrentUser } from "../components/App/App";

interface ICurrentUser {
  loggetIn: boolean;
  currentUser: CurrentUser | null;
}

export const CurrentUserContext = createContext({} as ICurrentUser);