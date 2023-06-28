import { UserFB } from "../../types";

export interface MyProfileFormInput {
  name: string;
  email: String;
}

export interface MyProfileProps {
  onLogOut: () => void
  setCurrentUser: (user: UserFB) => void
}