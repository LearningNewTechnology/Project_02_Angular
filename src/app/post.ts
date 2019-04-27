import { Injectable } from '@angular/core';
import { User } from './user';
import { PostLike } from 'src/postLike';

@Injectable({
    providedIn: 'root'
})

export class Post {
    public user_id: number;
    public description: string;
    public title: string;
    public id: number;
    public postLikes: Array<PostLike> = new Array<PostLike>();
    public timestamp: any;
    public comments: Array<any> = new Array<any>();
    public friends: Array<User> = new Array<User>();
}
