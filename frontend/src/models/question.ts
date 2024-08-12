export interface Question {
  id: string;
  index: number;
  text: string;
  answer: string;
  options: string[];
  countdown: number;
}
