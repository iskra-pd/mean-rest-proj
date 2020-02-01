import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
* Authorization service
*/
@Injectable()
export class AuthService {
  constructor(private http: HttpClient,private router : Router) { }

/**
* Login specific user
*/
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('http://localhost:3000/api/login', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

/**
* Logout user
*/
  logout() {
    localStorage.removeItem('access_token');
	this.router.navigate(['/signin']);
  }

/**
* Getter for loggedIn property
*/
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}