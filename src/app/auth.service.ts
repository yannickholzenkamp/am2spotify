import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken: string;
  private userId: string;

  public setToken(token: string): void {
    this.authToken = token;
  }

  public getToken(): string {
    return this.authToken;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getUserId(): string {
    return this.userId;
  }
}
