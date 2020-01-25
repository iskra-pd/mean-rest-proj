import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

baseUri:string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }
  
  
  //Login
  userLoin(user){
	return this.http.post(`${this.baseUri}/login`,user); 
  }
  
  //Logout
  
  
  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUri}/users`);
  }

  // Get user by username
  getUser(username): Observable<any> {
    let url = `${this.baseUri}/users/${username}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res["user"] || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
