import { UserFB } from "../../types";

export interface LoginFormInput {
  name: string;
  email: String;
  password: String;
}

export interface DialogProps {
  type: string
  onLogin: (status: boolean) => void
  setCurrentUser: (user: UserFB) => void
}