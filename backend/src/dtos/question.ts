import { IQuestion } from 'models/question';

export class QuestionDto {
  id: string;
  text: string;
  answer: string;
  options: string[];

  constructor(question: IQuestion) {
    this.id = question._id as string;
    this.text = question.text;
    this.answer = question.answer;
    this.options = [...question.options];
  }
}
