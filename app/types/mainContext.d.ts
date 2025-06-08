import { IUser } from "./user";

export type MainContextType = {
  user: IUser | null;
  handleLogout: () => void;
  fetchUser: () => void;
  loading: boolean;
};
