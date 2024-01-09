import { AxiosResponse } from 'axios';
import { $api } from '../http';
import { User } from '../types';

export class UsersService {
  static async fetchUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>('/users');
  }

  static async fetchUser(id: string): Promise<AxiosResponse<User>> {
    return $api.get<User>(`/users/${id}`);
  }
}
