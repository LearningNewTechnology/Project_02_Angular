import { HttpClient, HttpHeaders } from '@angular/common/http'; //HttpResponse was not here before
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostLike } from '../classes/postLike';
import { Post } from '../classes/post';
import { User } from '../classes/user';

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
    return this.http.post(this.APP_URL + '/friends/login', JSON.stringify(u), this.options);
  }

  searchUsername(s: string): Observable<Object> {
    return this.http.get(this.APP_URL + '/friends/search/=' + s);
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

  registerNewUser(u: User): Observable<Object> {
    return this.http.post(this.APP_URL + '/friends/register', JSON.stringify(u), this.options);
  }

  loginValidation(u: User): Observable<Object> {
    return this.http.post(this.APP_URL + '/friends/login', JSON.stringify(u), this.options);
  }

  updateUser(u: User): Observable<Object> {
    return this.http.put(this.APP_URL + '/friends/', JSON.stringify(u), this.options);
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete(this.APP_URL + '/friends/' + id);
  }
  //#endregion

  //#region Post methods
  getAllPosts(): Observable<Object> {
    return this.http.get(this.APP_URL + '/posts');
  }

  getAllPostsByUser(userId: number): Observable<Object> {
    return this.http.get(this.APP_URL + '/posts/user/' + userId);
  }

  createNewPost(p: Post): Observable<Object> {
    return this.http.post(this.APP_URL + '/posts', JSON.stringify(p), this.options);
  }

  updatePost(p: Post): Observable<Object> {
    return this.http.put(this.APP_URL + '/posts', JSON.stringify(p), this.options);
  }

  deletePost(postId: number): Observable<Object> {
    return this.http.delete(this.APP_URL + '/posts/' + postId);
  }
  //#endregion

  //#region PostLike methods
  likePost(pl: PostLike): Observable<Object> {
    return this.http.post(this.APP_URL + '/postlikes', JSON.stringify(pl), this.options);
  }

  unlikePost(pl: PostLike): Observable<Object> {
    return this.http.delete(this.APP_URL + '/postlikes/userid=' + pl.author.id + '&postid=' + pl.post.id);
  }
  //#endregion


  //#region Jordan stuff
  sendEmail(friend: User): Observable<Object> {
    return this.http.post(this.APP_URL + '/email/',  JSON.stringify(friend), this.options);
  }

  validateCode(resetKey: String): Observable<Object> {
    return this.http.get(this.APP_URL + '/friends/reset/'+ resetKey);
  }
  //endregion
  //#region UploadProfile methods
  getProfilePic(username: string) : Observable<Object>{
    return this.http.get(this.APP_URL + '/profile_image/?username=' + username);
  }

  uploadProfilePic(obj: Object): Observable<Object>{
    return this.http.post(this.APP_URL + '/profile_image/upload', obj);
  }
  //#endregion
}