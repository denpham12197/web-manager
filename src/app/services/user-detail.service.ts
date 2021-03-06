import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserDetail } from '../models/user-detail';
import {environment} from '../../environments/environment'

const api = environment.apiUrl + '/user/';
@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
 
  constructor(private http: HttpClient) { }

  showProfile(id: number) : Observable<User> {
    return this.http.get<User>(api + id);
  }

}
