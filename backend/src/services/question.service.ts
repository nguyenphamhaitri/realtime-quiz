import { QuestionDto } from 'dtos/question';
import Question from 'models/question';

class QuestionService {
  private static _instance: QuestionService;

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public async createQuestion(question: QuestionDto) {
    var newQuestion = new Question({
      text: question.text.toLocaleLowerCase('vi-VN'),
      answer: question.answer.toLocaleLowerCase('vi-VN'),
      options: question.options.map((opt) => opt.toLocaleLowerCase('vi-VN')),
    });
    await newQuestion.save();
    return new QuestionDto(newQuestion);
  }

  public async getRandomQuestions(size: number) {
    var data = await Question.aggregate([{ $sample: { size } }]);

    return data.map((question) => new QuestionDto(question));
  }
}

export const questionService = QuestionService.instance;
