import bcrypt from 'bcryptjs';
import { UserDto } from 'dtos/user';
import jwt from 'jsonwebtoken';
import User from 'models/user';
import { JWT_EXPIRY, JWT_SECRET, PS } from 'utils/constants';

class UserService {
  private static _instance: UserService;

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
  public async register(username: string, password: string) {
    const existed = await User.findOne({ username });
    if (existed) {
      throw new Error('username is existed.');
    }
    const hashedPassword = await bcrypt.hash(password, PS);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    return new UserDto(user);
  }
  public async login(username: string, password: string) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('user is not found.');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('incorrect username or password.');
    }
    const token = jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY },
    );
    return { token, user: new UserDto(user) };
  }

  public async generateGuestId(username: string) {
    const currentTime = Date.now();
    const hashedString = await bcrypt.hash(`${username}${currentTime}`, 3);

    let id = '';
    for (let i = hashedString.length - 1, len = 0; len < 4 && i > 0; i--) {
      if (/[0-9]/.test(hashedString[i])) {
        id += hashedString[i];
        len++;
      }
    }
    while (id.length < 4) {
      id += '0';
    }

    return id;
  }
}

export const userService = UserService.instance;
