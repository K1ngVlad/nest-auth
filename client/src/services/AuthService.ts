import { AxiosResponse } from 'axios';
import { $api } from '../http';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export class AuthService {
  static async login(user: LoginRequest): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', user);
  }

  static async registration(
    user: RegisterRequest
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/registration', user);
  }

  static async logout(): Promise<void> {
    $api.get('/auth/logout');
  }
}
