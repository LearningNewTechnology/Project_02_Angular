import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.get(this.APP_URL + '/users/' + id);
  }

  registerNewUser(u: User): Observable<Object> {
    return this.http.post(this.APP_URL + '/users/', u);
  }

  updateUser(u: User): Observable<Object> {
    return this.http.put(this.APP_URL + '/users/' + u.id, u);
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete(this.APP_URL + '/users/' + id);
  }
  //#endregion

  //#region Post methods
  getAllPosts(): Observable<Object> {
    return this.http.get(this.APP_URL + '/feed/');
  }

  getAllPostsByUser(userId: number): Observable<Object> {
    return this.http.get(this.APP_URL + '/users/' + userId + '/posts/');
  }

  createNewPost(userId: number, p: Post): Observable<Object> {
    return this.http.post(this.APP_URL + '/users/' + userId + '/posts/', p);
  }

  updatePostr(userId: number, p: Post): Observable<Object> {
    return this.http.put(this.APP_URL + '/users/' + userId + '/posts/' + p.id, p);
  }

  deletePost(userId: number, postId: number): Observable<Object> {
    return this.http.delete(this.APP_URL + '/users/' + userId + '/posts/' + postId);
  }
  //#endregion
}