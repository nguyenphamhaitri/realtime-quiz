import { Auth } from 'decorators/auth';
import { Roles } from 'decorators/role';
import { QuestionDto } from 'dtos/question';
import { Request, Response } from 'express';
import { questionService } from 'services/question.service';

export class QuestionController {
  @Auth()
  @Roles('admin')
  public static async CreateQuestion(request: Request, response: Response) {
    var question: QuestionDto = request.body;
    var data = await questionService.createQuestion(question);
    response.status(201).json(data);
  }

  @Auth()
  public static async GetRandomQuestions(request: Request, response: Response) {
    var size = Number(request.query.size) || 10;
    var data = await questionService.getRandomQuestions(size);
    response.status(200).json(data);
  }
}
