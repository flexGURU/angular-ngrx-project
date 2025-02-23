import { Inject, inject, Injectable } from '@angular/core';
import { UserConfig } from '../app.config';
import { RegisterRequestInterface } from '../auth/types/registerRequest.interface';
import { Observable } from 'rxjs';
import { currentUser } from '../shared/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject('API_URL') private baseUrl: UserConfig,
    private http: HttpClient
  ) {}

  register(request: RegisterRequestInterface): Observable<currentUser> {
    return this.http.post<currentUser>(this.baseUrl.apiUrl, request);
  }
}
