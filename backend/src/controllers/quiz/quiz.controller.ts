import { Request, Response } from 'express';
import { handleCreateSession } from 'socket/session';

export class QuizController {
  public static async createQuizSession(request: Request, response: Response) {
    const { name } = request.body;
    const sessionId = await handleCreateSession(name);
    response.status(201).json({ sessionId });
  }
}
