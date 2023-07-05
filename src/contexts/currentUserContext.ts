import { createContext } from "vm";

// interface ICurrentUser {
//   loggetIn: boolean;
//   currentUser: string;
// }

export const CurrentUserContext = createContext(undefined);