import { User } from './user';

export interface Token {
  currentUser: User;
  accessToken: string;
  refreshToken: string;
}
