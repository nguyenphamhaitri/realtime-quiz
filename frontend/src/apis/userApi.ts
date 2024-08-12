import api from 'apis';

const baseURL = '/v1/users';

export class UserApi {
  public static async login(username: string, password: string) {
    return await api.post(`${baseURL}/login`, { username, password });
  }

  public static async register({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {}

  public static async generateGuestId(username: string) {
    const res = await api.post(`${baseURL}/generate-guest-id`, { username });

    return res.data?.id;
  }
}
