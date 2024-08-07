import { IUser } from 'models/user';

export class UserDto {
  username: string;
  role: string;

  constructor(user: IUser) {
    this.username = user.username;
    this.role = user.role;
  }
}
