import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //HttpResponse was not here before
import { Observable } from 'rxjs';
import { User } from './user';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //URL of Spring MVC app
  readonly APP_URL: string = 'http://localhost:8080/FaceYourBookSpace';

  readonly options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  checkLogin(u: User): Observable<Object> {
    console.log(u);
    return this.http.post(this.APP_URL + '/friends/login', JSON.stringify(u), this.options);
  }

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
    return this.http.post(this.APP_URL + '/friends/register', JSON.stringify(u), this.options);
  }

  //new login method create by Poho
  loginValidation(u: User): Observable<Object> {
    return this.http.post(this.APP_URL + '/friends/login', JSON.stringify(u), this.options);
  }

  updateUser(u: User): Observable<Object> {
    return this.http.put(this.APP_URL + '/friends/' + u.Id, JSON.stringify(u), this.options);
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
    return this.http.post(this.APP_URL + '/friends/' + userId + '/posts/', JSON.stringify(p), this.options);
  }

  updatePost(userId: number, p: Post): Observable<Object> {
    return this.http.put(this.APP_URL + '/friends/' + userId + '/posts/' + p.id, JSON.stringify(p), this.options);
  }

  deletePost(userId: number, postId: number): Observable<Object> {
    return this.http.delete(this.APP_URL + '/friends/' + userId + '/posts/' + postId);
  }
  //#endregion
}