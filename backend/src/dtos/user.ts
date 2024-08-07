import { IUser } from 'models/user';

export class UserDto {
  username: string;

  constructor(user: IUser) {
    this.username = user.username;
  }
}
