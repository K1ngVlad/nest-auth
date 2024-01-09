import { AuthService } from '../services';
import { LoginRequest, RegisterRequest, User } from '../types';
import { makeAutoObservable } from 'mobx';

export class Store {
  user: User = {} as User;
  isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  async login(request: LoginRequest) {
    try {
      const { data } = await AuthService.login(request);
      const { accessToken, user } = data;

      localStorage.setItem('accessToken', accessToken);
      this.setUser(user);
      this.setAuth(true);
    } catch (error) {
      console.log(error);
    }
  }

  async registration(requset: RegisterRequest) {
    try {
      const { data } = await AuthService.registration(requset);
      const { accessToken, user } = data;

      localStorage.setItem('accessToken', accessToken);
      this.setUser(user);
      this.setAuth(true);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await AuthService.logout();

      localStorage.removeItem('accessToken');
      this.setUser({} as User);
      this.setAuth(false);
    } catch (error) {
      console.log(error);
    }
  }
}

const store = new Store();

export { store };
