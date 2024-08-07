import { PagingQuery } from '../dtos/common';
import { UserDto } from '../dtos/user';

class QuizService {
  private static _instance: QuizService;

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}

export const quizService = QuizService.instance;
