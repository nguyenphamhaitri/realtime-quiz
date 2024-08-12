import { Request, Response } from 'express';
import { userService } from 'services/user.service';

export class UserController {
  public static async register(request: Request, response: Response) {
    const { username, password } = request.body;
    const data = await userService.register(username, password);
    response.status(201).json(data);
  }

  public static async login(request: Request, response: Response) {
    const { username, password } = request.body;
    const data = await userService.login(username, password);
    response.status(200).json(data);
  }

  public static async generateGuestId(request: Request, response: Response) {
    const { username } = request.body;
    const id = await userService.generateGuestId(username);
    response.status(201).json({ id });
  }
}
