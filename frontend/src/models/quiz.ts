export interface Quiz {
  quizId: string;
  name?: string;
  participants: string[];
  scoreBoard: { [username: string]: number };
  createUser: string;
}
