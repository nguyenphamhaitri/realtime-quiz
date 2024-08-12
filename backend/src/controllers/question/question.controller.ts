import { Auth } from 'decorators/auth';
import { Roles } from 'decorators/role';
import { QuestionDto } from 'dtos/question';
import { Request, Response } from 'express';
import { questionService } from 'services/question.service';

export class QuestionController {
  @Auth()
  @Roles('admin')
  public static async CreateQuestion(request: Request, response: Response) {
    const question: QuestionDto = request.body;
    const data = await questionService.createQuestion(question);
    response.status(201).json(data);
  }

  public static async GetRandomQuestions(request: Request, response: Response) {
    const size = Number(request.query.size) || 10;
    const data = await questionService.getRandomQuestions(size);
    response.status(200).json(data);
  }
}
