import api from 'apis';

const baseURL = '/v1/quizzes';

interface QuizResponse {
  quizId: string;
}

export class QuizApi {
  public static async createQuiz(username: string, name?: string) {
    const res = await api.post(`${baseURL}`, { username, name });
    return res.data as QuizResponse;
  }
}
