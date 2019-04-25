import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; //HttpRequest was not here before
import { Observable } from 'rxjs';
import { User } from './user';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //URL of Spring MVC app
  readonly APP_URL: string = 'http://localhost:8080/FaceYourBookSpace';

  constructor(private http: HttpClient) { }

  //#region User methods
  getAllUsers(): Observable<Object> {
    return this.http.get(this.APP_URL + '/friends');
  }

  getUserById(id: number): Observable<Object> {
    return this.http.get(this.APP_URL + '/friends/' + id);
  }

  getUserByUsername(username: string): Observable<Object> {
    return this.http.get(this.APP_URL + '/friends/=' + username);
  }

  //orignal: u: String is (u: User)
  registerNewUser(u: User): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.APP_URL + '/friends/register', JSON.stringify(u), httpOptions);
  }

  //new login method create by Poho
  loginValidation(u: User): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.APP_URL + '/friends/login', JSON.stringify(u), httpOptions);
  }

  updateUser(u: User): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.APP_URL + '/friends/' + u.id, u, httpOptions);
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete(this.APP_URL + '/friends/' + id);
  }
  //#endregion

  //#region Post methods
  getAllPosts(): Observable<Object> {
    return this.http.get(this.APP_URL + '/feed/');
  }

  getAllPostsByUser(userId: number): Observable<Object> {
    return this.http.get(this.APP_URL + '/friends/' + userId + '/posts/');
  }

  createNewPost(userId: number, p: Post): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.APP_URL + '/friends/' + userId + '/posts/', p, httpOptions);
  }

  updatePostr(userId: number, p: Post): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.APP_URL + '/friends/' + userId + '/posts/' + p.id, p, httpOptions);
  }

  deletePost(userId: number, postId: number): Observable<Object> {
    return this.http.delete(this.APP_URL + '/friends/' + userId + '/posts/' + postId);
  }
  //#endregion
}