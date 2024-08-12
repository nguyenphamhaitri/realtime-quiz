import { Request, Response } from 'express';
import { handleCreateQuiz } from 'socket/quiz';

export class QuizController {
  public static async createQuiz(request: Request, response: Response) {
    const { username, name } = request.body;
    const quizId = await handleCreateQuiz(username, name);
    response.status(201).json({ quizId });
  }
}
