import { User } from 'firebase/auth';

export declare interface UserFB extends User {
  accessToken?: string
}

export interface UserCredential {
  user: UserFB
}

export interface UserRegData {
  name?: string
  email: string
  password: string
}

export interface UserFromMyBase extends UserRegData {
  movies: [],
  createdAt: string,
  creationTime: string,
}