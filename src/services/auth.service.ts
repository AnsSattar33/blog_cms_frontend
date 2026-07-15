import api from "@/services/axios";
import type { APIResponse, LoginInput, Session, User } from "@/types";

export const authService = {
  async login(credentials: LoginInput): Promise<APIResponse<Session>> {
    const { data } = await api.post<APIResponse<Session>>("/auth/login", credentials);
    return data;
  },

  async logout(): Promise<APIResponse<null>> {
    const { data } = await api.post<APIResponse<null>>("/auth/logout");
    return data;
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<APIResponse<User>>("/auth/me");
    return data.data;
  },

  async getSession(): Promise<APIResponse<Session | null>> {
    try {
      const user = await this.getMe();
      return { data: { user } };
    } catch {
      return { data: null };
    }
  },
};
